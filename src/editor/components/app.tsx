import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Blockly from 'blockly';

import { loggers } from '../../debug';
import { BLOCK_TRIGGER_SAVE_EVENTS, MACRO_FLAG_NS, MacroEditorMode, MacroFlags } from '../constants';
import { BlockEditor } from './block-editor';
import { CodeEditor } from './code-editor';
import { ModeButtons } from './mode-buttons';

const log = loggers.components;

const setTopBlockName = (workspace: Blockly.Workspace | null, name: string | undefined | null) => {
    if (!workspace || !name) {
        return;
    }
    const topBlocks = workspace.getTopBlocks(false);
    const topBlock = topBlocks?.[0] as Blockly.Block | undefined;
    topBlock?.setFieldValue(name, 'MACRO_NAME');
};

const getWorkspaceState = (workspace: Blockly.Workspace | null): string =>
    workspace ? Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)) : '';

const restoreWorkspaceState = (workspace: Blockly.Workspace | null, state: string | null) => {
    log('App:restoreWorkspaceState | %s - %o', workspace, state);
    if (workspace && state) {
        Blockly.Events.disable();
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(state), workspace);
        Blockly.Events.enable();
    }
};

const getWorkspaceCode = (workspace: Blockly.Workspace | null): string =>
    workspace ? Blockly.JavaScript.workspaceToCode(workspace) : '';

const updateMacroSilently = async (macro: Macro, data: Macro.Data) => {
    const options = { diff: true };

    // WE NEED TO HANDLE UPDATING OURSELVES AS A REDRAW HURTS US
    const response = SocketInterface.dispatch('modifyDocument', {
        action: 'update',
        data,
        options,
        type: 'Macro',
    });

    // WE NEED TO HANDLE UPDATING OURSELVES AS A REDRAW HURTS US
    mergeObject(macro.data, data, { overwrite: true });

    return response;
};

const MACRO_MODE_PATH = ['flags', MACRO_FLAG_NS, MacroFlags.EditorMode].join('.');
const BLOCK_STATE_PATH = ['flags', MACRO_FLAG_NS, MacroFlags.BlockState].join('.');
const BLOCK_COMMAND_PATH = 'command';

interface AppProps {
    appId: string;
    config: MacroConfig;
    portalContainer: HTMLElement;
    codeEditor$: JQuery<Element>;
}

export const App: FunctionComponent<AppProps> = ({ appId, portalContainer, codeEditor$, config }) => {
    log('App:render');
    const code = useRef<string>('');
    const workspace = useRef<Blockly.WorkspaceSvg | null>(null);

    const lockedMode =
        (config.object.getFlag(MACRO_FLAG_NS, MacroFlags.EditorMode) as MacroEditorMode | null) ?? undefined;
    log('App:lockedMode | %s', lockedMode);

    const [editorMode, setMode] = useState<MacroEditorMode>((lockedMode as MacroEditorMode) ?? MacroEditorMode.Code);
    log('App:editorMode | %s', editorMode);

    const updateMacro = useCallback(async (macro: Macro, path: string, value: unknown): Promise<void> => {
        log('App:updateMacro start | macro:%o - path:%s - value:%o', macro, path, value);
        await macro.update({ [path]: value, type: 'script' });
        log('App:updateMacro end');
    }, []);

    const onEditorChange = useCallback(
        async (type: MacroEditorMode) => {
            log('App:onEditorChange | type:%s - lockMode:%s', type, lockedMode);
            // Lock the editor if one side or the other changes, and we're not locked
            if (lockedMode === undefined) {
                log('App:onEditorChange - updating lockedMode start | type:%s', type);
                await updateMacroSilently(config.object, ({
                    _id: config.object.id,
                    [MACRO_MODE_PATH]: type,
                } as unknown) as Macro.Data);
                log('App:onEditorChange - updating lockedMode end');
            }
        },
        [lockedMode, config],
    );

    const onWorkspaceChange = useCallback(
        async (
            event: Blockly.Events.Change | Blockly.Events.Create,
            changedWorkspace: Blockly.Workspace,
        ): Promise<void> => {
            log('App:onWorkspaceChange | event: %o', event);
            code.current = Blockly.JavaScript.workspaceToCode(changedWorkspace);
            log('App:onWorkspaceChange - code | code: %s', code.current);
            if (event.type === Blockly.Events.CHANGE) {
                const e = (event as unknown) as { name: string; newValue: string };
                if (e.name === 'MACRO_NAME') {
                    const $name = jQuery(portalContainer)
                        .closest('.macro-sheet')
                        .find<HTMLInputElement>('form > header > h1 > input[type=text][name="name"]');
                    $name.val(e.newValue);
                }
            } else if (event.type === Blockly.Events.CREATE) {
                await onEditorChange(MacroEditorMode.Blocks);
            }

            if (BLOCK_TRIGGER_SAVE_EVENTS.includes(event.type)) {
                const data = expandObject({
                    _id: config.object.id,
                    [BLOCK_COMMAND_PATH]: Blockly.JavaScript.workspaceToCode(changedWorkspace),
                    [BLOCK_STATE_PATH]: getWorkspaceState(changedWorkspace),
                    type: 'script',
                }) as Macro.Data;
                void updateMacroSilently(config.object, data);
            }
        },
        [onEditorChange, portalContainer, config],
    );

    const onWorkspaceRendered = useCallback(
        (renderedWorkspace: Blockly.WorkspaceSvg) => {
            log('App:onWorkspaceRendered | renderedWorkspace: %o', renderedWorkspace);
            const $name = jQuery(portalContainer)
                .closest('.macro-sheet')
                .find<HTMLInputElement>('form > header > h1 > input[type=text][name="name"]');
            workspace.current = renderedWorkspace;
            setTopBlockName(workspace.current, $name.val() as string);
            $name.on('input', (e) => setTopBlockName(workspace.current, e.currentTarget?.value));
            code.current = Blockly.JavaScript.workspaceToCode(workspace.current);
            const savedState = (getProperty(config.object.data, BLOCK_STATE_PATH) as string | null | undefined) ?? null;
            restoreWorkspaceState(workspace.current, savedState);
        },
        [config, workspace, portalContainer],
    );

    const onModeSelected = useCallback(
        async (mode: MacroEditorMode) => {
            log('App:onModeSelected | mode: %s', mode);
            if (mode === MacroEditorMode.Code && workspace.current && lockedMode) {
                // TODO - refresh?
                code.current = getWorkspaceCode(workspace.current);
                await updateMacro(config.object, BLOCK_COMMAND_PATH, code.current);
                log('App:onModeSelected - updating code | mode: %s - code: %s', mode, code.current);
            }
            setMode(mode);
        },
        [setMode, workspace, code, lockedMode, config, updateMacro],
    );

    useEffect(() => {
        if (appId) {
            log('App:useEffect - #1 | workspace: %o', workspace.current);
            const onUpdateMacro = (_: MacroConfig, data: Record<string, unknown>) => {
                if (workspace.current) {
                    setProperty(data, BLOCK_STATE_PATH, getWorkspaceState(workspace.current));
                    setProperty(data, BLOCK_COMMAND_PATH, getWorkspaceCode(workspace.current));
                }
            };
            const id = Hooks.on('preUpdateMacro', onUpdateMacro);
            return () => Hooks.off('preUpdateMacro', id);
        }
    }, [appId, workspace]);

    useEffect(() => {
        log('App:useEffect - #2 | config: %o - workspace: %o', config, workspace.current);
        const savedState = (getProperty(config.object.data, BLOCK_STATE_PATH) as string | null | undefined) ?? null;
        log('App:useEffect - #2 | savedState: %s', savedState);
        restoreWorkspaceState(workspace.current, savedState);
    }, [config, workspace]);

    return createPortal(
        <>
            <ModeButtons mode={editorMode} onModeSelected={onModeSelected} lockedMode={lockedMode} />
            {editorMode === MacroEditorMode.Code ? (
                <CodeEditor
                    code={code.current}
                    codeEditor$={codeEditor$}
                    isLocked={lockedMode === MacroEditorMode.Blocks}
                    onEditorChange={() => onEditorChange(MacroEditorMode.Code)}
                />
            ) : (
                <BlockEditor
                    isLocked={lockedMode === MacroEditorMode.Code}
                    onWorkspaceChange={onWorkspaceChange}
                    onWorkspaceRendered={onWorkspaceRendered}
                    workspace={workspace}
                />
            )}
        </>,
        portalContainer,
    );
};

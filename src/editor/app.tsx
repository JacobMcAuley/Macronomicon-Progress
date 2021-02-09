import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

import Blockly from 'blockly';

import { BlockEditor } from './block-editor';
import { CodeEditor } from './code-editor';
import { MACRO_FLAG_NS, MacroEditorMode, MacroFlags } from './constants';
import { ModeButtons } from './mode-buttons';

const setTopBlockName = (workspace: Blockly.Workspace | null, name: string | undefined | null) => {
    if (!workspace || !name) {
        return;
    }
    const topBlocks = workspace.getTopBlocks(false);
    const topBlock = (topBlocks?.[0]) as Blockly.Block | undefined;
    topBlock?.setFieldValue(name, 'MACRO_NAME');
};

const BLOCK_STATE_PATH = ['flags', MACRO_FLAG_NS, MacroFlags.BlockState].join('.');

interface AppProps {
    appId: string;
    config: MacroConfig;
    portalContainer: HTMLElement;
    codeEditor$: JQuery<Element>;
}

export const App: FunctionComponent<AppProps> = ({ appId, portalContainer, codeEditor$, config }) => {
    const code = useRef<string>('');
    const workspace = useRef<Blockly.Workspace | null>(null);
    const formField = useRef<HTMLTextAreaElement | null>(null);

    const lockedMode = config.object.getFlag(MACRO_FLAG_NS, MacroFlags.EditorMode) ?? null as MacroEditorMode | null;

    const onResize = useCallback(
        () => {
            if (workspace.current) {
                Blockly.svgResize(workspace.current);
            }
        },
        [workspace]
    );

    const onEditorChange = useCallback(
        async (type: MacroEditorMode) => {
            if (lockedMode === null) {
                await config.object.setFlag(MACRO_FLAG_NS, MacroFlags.EditorMode, type);
            }
            if (workspace.current && formField.current) {
                code.current = Blockly.JavaScript.workspaceToCode(workspace.current);
                formField.current.innerHTML = code.current;
            }
        },
        [lockedMode, config, code]
    );

    const resize = useRef(new ResizeObserver(onResize));

    const onWorkspaceRendered = useCallback(
        (renderedWorkspace) => {
            const $name = jQuery(portalContainer).closest('.macro-sheet').find<HTMLInputElement>('form > header > h1 > input[type=text][name="name"]');
            workspace.current = renderedWorkspace;

            workspace.current?.addChangeListener((event: Blockly.Events.Change | Blockly.Events.Create) => {
                if (event.type === Blockly.Events.CHANGE) {
                    if ((event as unknown as { name: string; }).name === 'MACRO_NAME') {
                        $name.val((event as unknown as { newValue: string; }).newValue as string);
                    }
                } else if (event.type === Blockly.Events.CREATE) {
                    onEditorChange(MacroEditorMode.Blocks);
                }
            });

            setTopBlockName(workspace.current, $name.val() as string);

            $name.on('input', (e) => setTopBlockName(workspace.current, e.currentTarget?.value));
        },
        [workspace, onEditorChange, portalContainer]
    );

    const [editorMode, setMode] = useState<MacroEditorMode>(lockedMode ?? MacroEditorMode.Code);

    const onModeSelected = useCallback((mode: MacroEditorMode) => {
        if (mode === MacroEditorMode.Code) {
            if (workspace.current) {
                code.current = Blockly.JavaScript.workspaceToCode(workspace.current);
            }
        }
        setMode(mode);
    }, [setMode, workspace, code]);

    useLayoutEffect(() => {
        const observer = resize.current;
        observer.observe(portalContainer);
        return () => observer.disconnect();
    }, [resize, portalContainer]);

    useLayoutEffect(
        () => onResize(),
        [editorMode, onResize]
    );

    useEffect(
        () => {
            if (appId) {
                const onUpdateMacro = (_: MacroConfig, data: Record<string, unknown>) => {
                    if (workspace.current) {
                        const xml = Blockly.Xml.workspaceToDom(workspace.current);
                        setProperty(data, BLOCK_STATE_PATH, Blockly.Xml.domToText(xml));
                    }
                };
                const id = Hooks.on('preUpdateMacro', onUpdateMacro);
                return () => {
                    Hooks.off('preUpdateMacro', id);
                };
            }
        },
        [appId, workspace]
    );

    useEffect(
        () => {
            const savedState = getProperty(config.object.data, BLOCK_STATE_PATH);
            if (savedState && workspace?.current) {
                workspace.current.clear();
                const xml = Blockly.Xml.textToDom(savedState);
                Blockly.Xml.domToWorkspace(xml, workspace.current);
            }
        },
        [config, workspace]
    );

    return createPortal(
        <>
            <ModeButtons mode={editorMode} onModeSelected={onModeSelected} lockedMode={lockedMode} />
            {editorMode === MacroEditorMode.Code ?
                <CodeEditor
                    code={code.current}
                    codeEditor$={codeEditor$}
                    isLocked={lockedMode === MacroEditorMode.Blocks}
                    onEditorChange={() => onEditorChange(MacroEditorMode.Code)}
                /> :
                <>
                    <BlockEditor
                        isLocked={lockedMode === MacroEditorMode.Code}
                        onWorkspaceRendered={onWorkspaceRendered} workspace={workspace.current} />
                    <textarea style={{ display: 'none' }} data-edit="command" ref={formField} />
                </>
            }
        </>,
        portalContainer,
    );
};
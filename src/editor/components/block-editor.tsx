import React, { FunctionComponent, useCallback, useLayoutEffect, useRef } from 'react';

import Blockly from 'blockly';

import { loggers } from '../../debug';
import { createWorkspace } from '../../workspace';

const log = loggers.components;

interface BlockEditorProps {
    isLocked?: boolean;
    onWorkspaceChange: (event: Blockly.Events.Change | Blockly.Events.Create, workspace: Blockly.Workspace) => void;
    onWorkspaceRendered: (workspace: Blockly.Workspace) => void;
    workspace: React.MutableRefObject<Blockly.Workspace | null>;
}

export const BlockEditor: FunctionComponent<BlockEditorProps> = ({
    isLocked = false,
    onWorkspaceChange,
    onWorkspaceRendered,
    workspace,
}) => {
    // const workspace = workspaceRef.current;
    log('BlockEditor:render | %o', workspace);
    const container = useRef<HTMLDivElement | null>(null);

    const handleChange = useCallback(
        (event: Blockly.Events.Change | Blockly.Events.Create, currentWorkspace: Blockly.Workspace) => {
            log('BlockEditor:handleChange | event:%o - workspace: %o', event, currentWorkspace);
            currentWorkspace && onWorkspaceChange(event, currentWorkspace);
        },
        [onWorkspaceChange],
    );

    const onResize = useCallback(() => {
        log('BlockEditor:onResize | workspace: %o', workspace.current);
        workspace && Blockly.svgResize(workspace.current);
    }, [workspace]);

    const resize = useRef(new ResizeObserver(() => onResize()));

    useLayoutEffect(() => {
        log('BlockEditor:useLayoutEffect #1 | workspace: %o - container', workspace, container.current);
        if (container.current) {
            log('BlockEditor:useLayoutEffect #1 | create: %o', !workspace);
            const currentWorkspace = workspace.current || createWorkspace(container.current, { readOnly: isLocked });
            log(
                'BlockEditor:useLayoutEffect #1 | currentWorkspace: %o - changed: %o',
                currentWorkspace === workspace.current,
            );
            // For redraws
            if (currentWorkspace.injectionDiv_ && container.current.childElementCount === 0) {
                log('BlockEditor:useLayoutEffect #1 | inject: %o', currentWorkspace.injectionDiv_);
                container.current.appendChild(currentWorkspace.injectionDiv_);
            } else {
                log('BlockEditor:useLayoutEffect #1 - addChangeListener | handleChange: %o', handleChange);
                currentWorkspace.addChangeListener((event: Blockly.Events.Change | Blockly.Events.Create) =>
                    handleChange(event, currentWorkspace),
                );
            }

            onWorkspaceRendered(currentWorkspace);
            onResize();
        }
    }, [container, workspace, onWorkspaceRendered, isLocked, onResize, handleChange]);

    useLayoutEffect(() => {
        log('BlockEditor:useLayoutEffect #2 | container: %o', container.current);
        if (container.current) {
            const observeTarget = jQuery(container.current).closest('.sheet')[0];
            const observer = resize.current;
            log('BlockEditor:useLayoutEffect #2 | observeTarget: %o', observeTarget);
            observer.observe(observeTarget);
            return () => observer.disconnect();
        }
    }, [container, workspace, onWorkspaceRendered, isLocked]);

    return (
        <div className="form-group" data-macronomicon-component="workspace-wrapper">
            <div data-macronomicon-component="workspace" ref={container}></div>
        </div>
    );
};

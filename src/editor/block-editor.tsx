import React, { FunctionComponent, useLayoutEffect, useRef } from 'react';

import Blockly from 'blockly';

import { createWorkspace } from '../workspace';

interface BlockEditorProps {
    isLocked?: boolean;
    onWorkspaceRendered: (el: Blockly.Workspace) => void;
    workspace: Blockly.Workspace | null;
}

export const BlockEditor: FunctionComponent<BlockEditorProps> = ({ isLocked = false, onWorkspaceRendered, workspace }) => {
    const container = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (container.current) {
            if (!workspace) {
                onWorkspaceRendered(createWorkspace(container.current, { readOnly: isLocked }));
            } else if (workspace.injectionDiv_) {
                container.current.appendChild(workspace.injectionDiv_);
            }
        }
    }, [container, workspace, onWorkspaceRendered, isLocked]);

    return (
        <div className="form-group" data-macronomicon-component="workspace-wrapper">
            <div data-macronomicon-component="workspace" ref={container}></div>
        </div>
    );
};

import React, { FunctionComponent } from 'react';

import { MacroEditorMode } from '../constants';

interface ModeButtonsProps {
    lockedMode?: MacroEditorMode;
    mode: MacroEditorMode;
    onModeSelected: (mode: MacroEditorMode) => void;
}

export const ModeButtons: FunctionComponent<ModeButtonsProps> = ({ mode, onModeSelected }) => {
    const keys = Object.entries(MacroEditorMode).reverse();
    return (
        <div className="form-group" data-macronomicon-component="editor-mode-switch">
            {keys.map(([key, value]) => (
                <button
                    className={mode === value ? 'selected' : ''}
                    type="button"
                    data-macronomicon-component="editor-mode-switch-button"
                    data-macronomicon-action="code"
                    onClick={() => onModeSelected(value)}
                    key={key}
                >
                    <i className={`fas fa-${value === MacroEditorMode.Code ? 'code' : 'cube'}`}></i>
                    {key}
                </button>
            ))}
        </div>
    );
};

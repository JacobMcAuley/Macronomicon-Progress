import Blockly from 'blockly';

export const MACRO_FLAG_NS = 'macronomicon';

export enum MacroFlags {
    EditorMode = 'editor-mode',
    BlockState = 'block-state',
}

export enum MacroEditorMode {
    Blocks = 'blocks',
    Code = 'code',
}

export const BLOCK_TRIGGER_SAVE_EVENTS = [
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE,
    Blockly.Events.BLOCK_MOVE,
    Blockly.Events.CHANGE,
    Blockly.Events.DELETE,
    Blockly.Events.CREATE,
    Blockly.Events.MOVE,
    Blockly.Events.VAR_CREATE,
    Blockly.Events.VAR_DELETE,
    Blockly.Events.VAR_RENAME,
];

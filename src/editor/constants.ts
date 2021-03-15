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
    Blockly.Events.BLOCK_CHANGE as string,
    Blockly.Events.BLOCK_CREATE as string,
    Blockly.Events.BLOCK_DELETE as string,
    Blockly.Events.BLOCK_MOVE as string,
    Blockly.Events.CHANGE as string,
    Blockly.Events.DELETE as string,
    Blockly.Events.CREATE as string,
    Blockly.Events.MOVE as string,
    Blockly.Events.VAR_CREATE as string,
    Blockly.Events.VAR_DELETE as string,
    Blockly.Events.VAR_RENAME as string,
];

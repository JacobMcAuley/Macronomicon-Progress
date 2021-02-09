

import * as Blockly from 'blockly';

import { formatCode } from '../code-formatter';
import { BlockNames } from './block-definitions';

const BlockJSON = {
    [BlockNames.Base]: {
        args0: [
            {
                name: 'MACRO_NAME',
                text: 'NAME',
                type: 'field_input',
            },
            {
                type: 'input_dummy',
            },
            {
                name: 'MACRO_BODY',
                type: 'input_statement',
            },
        ],
        colour: 195,
        inputsInline: true,
        message0: 'Macro %1 %2 %3',
        tooltip: 'Your macro',
        type: 'macro_base',
    },
};

Blockly.Blocks[BlockNames.Base] = {
    init: function (this: Blockly.Block) {
        this.jsonInit(BlockJSON[BlockNames.Base]);
    },
};

/* Generators */

Blockly.JavaScript[BlockNames.Base] = (block) => {
    const code = Blockly.JavaScript.statementToCode(block, 'MACRO_BODY');

    try {
        return formatCode(code);
    } catch (e) {
        console.error(e);
        return code;
    }
};

import Blockly from 'blockly';

import { BlockColours, BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.UserInputNumber,
    JSON: {
        args0: [
            {
                name: 'INPUT_NUMBER',
                text: '0',
                type: 'field_number',
            },
        ],
        colour: BlockColours.Red,
        message0: 'number %1',
        output: BlockTypes.Number,
    },
    generator: (_, block) => {
        const code = parseInt(block.getFieldValue('INPUT_NUMBER'), 10).toString();
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

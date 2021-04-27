import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.TokensSelectorFirst,
    JSON: {
        args0: [
            {
                name: 'COLLECTION',
                type: 'input_value',
                check: [BlockTypes.TokenCollection],
            },
        ],
        inputsInline: true,
        message0: 'the first of %1',
        output: BlockTypes.Token,
        tooltip: 'Only uses the first token',
    },
    generator: (_, block) => {
        const collection = Blockly.JavaScript.valueToCode(block, 'COLLECTION', Blockly.JavaScript.ORDER_NONE);
        const code = `Array.from(${collection}).shift()`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

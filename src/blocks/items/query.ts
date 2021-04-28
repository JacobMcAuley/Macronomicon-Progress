import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.ItemsOnToken,
    JSON: {
        args0: [
            {
                name: 'INPUT',
                type: 'input_value',
                check: [BlockTypes.Token, BlockTypes.Actor],
            },
            {
                name: 'FILTER',
                type: 'input_value',
                check: [BlockTypes.ItemCollectionFilter],
            },
        ],
        inputsInline: true,
        message0: 'items of %1 %2',
        output: BlockTypes.ItemCollection,
        tooltip: 'Gets all the tokens within the scene',
    },
    generator: (_, block) => {
        const filter = Blockly.JavaScript.valueToCode(block, 'FILTER', Blockly.JavaScript.ORDER_NONE);

        const inputCode = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_NONE);

        const code =
            block.getInputTargetBlock('INPUT')?.outputConnection?.getCheck()?.[0] === BlockTypes.Token
                ? `(${inputCode}.actor.items)`
                : `(${inputCode}.items)`;

        const filtered = !block.allInputsFilled() ? code : `${code}.filter(${filter})`;

        return [filtered, Blockly.JavaScript.ORDER_NONE];
    },
});

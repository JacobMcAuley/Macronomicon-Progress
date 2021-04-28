import Blockly from 'blockly';

import { BlockColours, BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.RollItemCard,
    JSON: {
        args0: [
            {
                check: [BlockTypes.Item],
                name: 'ITEM',
                type: 'input_value',
            },
        ],
        colour: BlockColours.Orange,
        inputsInline: true,
        message0: 'Create item card from %1',
        previousStatement: null,
        nextStatement: null,
        tooltip: 'Creates an item card to chat from which you can roll attack or damage',
    },
    generator: (_, block) => {
        const collectionCode = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_NONE);
        return `game.dnd5e.rollItemMacro(${collectionCode}.name);`;
    },
});

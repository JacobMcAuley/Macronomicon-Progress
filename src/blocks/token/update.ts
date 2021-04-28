import Blockly from 'blockly';

import { BlockColours, BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.TokenUpdateHealth,
    JSON: {
        args0: [
            {
                name: 'UPDATE_TYPE',
                options: [
                    ['heal', 'heal'],
                    ['damage', 'damage'],
                ],
                type: 'field_dropdown',
            },
            {
                check: [BlockTypes.Token, BlockTypes.TokenCollection],
                name: 'TOKEN',
                type: 'input_value',
            },
            {
                check: BlockTypes.Number,
                name: 'HEALING_AMOUNT',
                type: 'input_value',
            },
        ],
        colour: BlockColours.Default,
        inputsInline: true,
        message0: '%1 %2 by %3',
        previousStatement: null,
        nextStatement: null,
    },
    generator: (_, block) => {
        const operator = block.getFieldValue('UPDATE_TYPE') === 'heal' ? '+' : '-';

        const collectionBlock = block.getInputTargetBlock('TOKEN');
        const collectionCode = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_NONE);

        const collection = (collectionBlock?.outputConnection.getCheck() ?? []).includes(BlockTypes.Token)
            ? `[${collectionCode}]`
            : collectionCode; // default to []

        const healingAmount = Blockly.JavaScript.valueToCode(block, 'HEALING_AMOUNT', Blockly.JavaScript.ORDER_NONE);
        const code = `
        for (const item of ${collection}) {
          const hp = getProperty(item.actor, 'data.data.attributes.hp');
          const [min, max, value] = [hp.min ?? 0, hp.max ?? Infinity, hp.value ?? 1];
          const healingAmount = Math.clamped(value ${operator} ${healingAmount || 1}, min, max);
          await item.actor.update({ ['data.attributes.hp.value']: healingAmount });
        }
      `;
        return code;
    },
});

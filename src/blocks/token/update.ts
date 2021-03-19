import Blockly from 'blockly';

import { BlockColours, BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.TokenUpdateHeal,
    JSON: {
        args0: [
            {
                check: [BlockTypes.Token, BlockTypes.Actor],
                name: 'TARGET_TOKEN',
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
        message0: 'Heal %1 by %2',
        previousStatement: null,
        nextStatement: null,
    },
    generator: (_, block) => {
        const item = Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN', Blockly.JavaScript.ORDER_NONE);
        const healingAmount = Blockly.JavaScript.valueToCode(block, 'HEALING_AMOUNT', Blockly.JavaScript.ORDER_NONE);
        return `
        {
          const hp = getProperty(${item}.actor, 'data.data.attributes.hp');
          const [min, max, value] = [hp.min ?? 0, hp.max ?? Infinity, hp.value ?? 1];
          const healingAmount = Math.clamped(value + ${healingAmount || 1}, min, max);
          await ${item}.actor.update({ ['data.attributes.hp.value']: healingAmount });
        }
        `;
    },
});

defineBlock({
    name: BlockNames.TokenUpdateDamage,
    JSON: {
        args0: [
            {
                check: [BlockTypes.Token, BlockTypes.Actor],
                name: 'TARGET_TOKEN',
                type: 'input_value',
            },
            {
                check: BlockTypes.Number,
                name: 'DAMAGE_AMOUNT',
                type: 'input_value',
            },
        ],
        colour: BlockColours.Default,
        inputsInline: true,
        message0: 'Damage %1 by %2',
        previousStatement: null,
        nextStatement: null,
    },
    generator: (_, block) => {
        const item = Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN', Blockly.JavaScript.ORDER_NONE);
        const damageAmount = Blockly.JavaScript.valueToCode(block, 'DAMAGE_AMOUNT', Blockly.JavaScript.ORDER_NONE);
        return `
      {
        const hp = getProperty(${item}.actor, 'data.data.attributes.hp');
        const [min, max, value] = [hp.min ?? 0, hp.max ?? Infinity, hp.value ?? 1];
        const damageAmount = Math.clamped(value - ${damageAmount || 1}, min, max);
        await ${item}.actor.update({ ['data.attributes.hp.value']: damageAmount });
      }
      `;
    },
});

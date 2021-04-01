import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.RollDice,
    JSON: {
        args0: [
            {
                check: BlockTypes.RollCollection,
                name: 'ROLL_COLLECTION',
                type: 'input_value',
            },
        ],
        colour: 0,
        message0: 'Roll Dice Formula: %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'ROLL_COLLECTION', Blockly.JavaScript.ORDER_NONE) ||
            "(await new Roll('0'))";
        const code = `(${collection}).roll();`;
        return code;
    },
});

defineBlock({
    name: BlockNames.UseWeapon,
    JSON: {
        args0: [
            {
                check: 'String',
                name: 'ITEM_NAME',
                text: 'Sword',
                type: 'field_input',
            },
        ],
        colour: 0,
        inputsInline: true,
        message0: 'Use item %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
        tooltip: 'Locates an item with the given name to use. Take first item found.',
    },
    generator: (_, block) => `{
        const speaker = ChatMessage.getSpeaker();
        const itemName = "${block.getFieldValue('ITEM_NAME')}"

        // Get matching items
        const items = target.actor ? target.actor.items.filter(i => i.name.toLowerCase() === itemName.toLowerCase()) : [];

        if (items.length === 0) {
          ui.notifications.warn(\`The Actor \${target.actor.name} does not have an item named \${itemName}\`);
          return;
        }
        
        if (items.length > 1) {
          ui.notifications.warn(\`The Actor \${target.actor.name} has more than one item with name \${itemName}. The first matched item will be chosen.\`);
        }

        // Trigger the item roll
        await items[0].roll();
    }
  `,
});

defineBlock({
    name: BlockNames.UseSpell,
    JSON: {
        args0: [
            {
                check: 'String',
                name: 'SPELL_NAME',
                text: 'Fireball',
                type: 'field_input',
            },
        ],
        colour: 0,
        inputsInline: true,
        message0: 'Cast spell %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
        tooltip: 'Locates a spell with the given name to use. Take first spell found.',
    },
    generator: (_, block) => `{
          const speaker = ChatMessage.getSpeaker();
          const itemName = "${block.getFieldValue('SPELL_NAME')}"

          // Get matching items
          const items = target.actor ? target.actor.items.filter(i => i.name.toLowerCase() === itemName.toLowerCase()) : [];
  
          if (items.length === 0) {
            ui.notifications.warn(\`The Actor \${target.actor.name} does not have an item named \${itemName}\`);
            return;
          }
          
          if (items.length > 1) {
            ui.notifications.warn(\`The Actor \${target.actor.name} has more than one item with name \${itemName}. The first matched item will be chosen.\`);
          }
  
          // Trigger the item roll
          await items[0].roll();
      }
    `,
});

// TODO - Add some data for the chat message
defineBlock({
    name: BlockNames.RollFormula,
    JSON: {
        args0: [
            {
                check: BlockTypes.RollInfo,
                name: 'ROLL_FORMULA',
                type: 'input_value',
            },
            {
                check: Array,
                name: 'EXTRA_PARAMETERS',
                type: 'input_value',
            },
        ],
        colour: 0,
        inputsInline: true,
        message0: 'Dice Formula: %1 with %2',
        output: BlockTypes.RollCollection,
        tooltip: 'Used to create roll which you can extract info from',
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'ROLL_FORMULA', Blockly.JavaScript.ORDER_NONE) || `"0"`;
        const parameters =
            Blockly.JavaScript.valueToCode(block, 'EXTRA_PARAMETERS', Blockly.JavaScript.ORDER_NONE) || `"0"`;
        console.log(parameters);
        return [`await new Roll(${collection}, {})`, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.RollPredefined,
    JSON: {
        args0: [
            {
                check: 'Number',
                name: 'ROLL_AMOUNT',
                text: '1',
                type: 'field_input',
            },
            {
                name: 'ROLL_TYPE',
                options: [
                    ['d4', 'd4'],
                    ['d6', 'd6'],
                    ['d8', 'd8'],
                    ['d10', 'd10'],
                    ['d12', 'd12'],
                    ['d20', 'd20'],
                    ['d100', 'd100'],
                ],
                type: 'field_dropdown',
            },
            {
                check: BlockTypes.RollInfo,
                name: 'ROLL_COLLECTION',
                type: 'input_value',
            },
        ],
        colour: 0,
        message0: '%1 %2 %3',
        output: [BlockTypes.RollInfo],
    },
    generator: (_, block) => {
        const collection = Blockly.JavaScript.valueToCode(block, 'ROLL_COLLECTION', Blockly.JavaScript.ORDER_NONE);
        const amount = block.getFieldValue('ROLL_AMOUNT') || '0';
        const rollType = block.getFieldValue('ROLL_TYPE') || 'd0';
        const regex = /(?!^|.$)["]/gm;
        const code = collection ? `"${amount}${rollType} + ${collection}"` : `"${amount}${rollType}"`;
        return [code.replace(regex, ''), Blockly.JavaScript.ORDER_ATOMIC];
    },
});

defineBlock({
    name: BlockNames.RollCustom,
    JSON: {
        args0: [
            {
                check: 'String',
                name: 'ROLL_CUSTOM',
                text: '1d6 + 2d8 + 1',
                type: 'field_input',
            },
            {
                check: BlockTypes.RollInfo,
                name: 'ROLL_COLLECTION',
                type: 'input_value',
            },
        ],
        colour: 0,
        message0: '%1 %2',
        output: BlockTypes.RollInfo,
    },
    generator: (_, block) => {
        const collection = Blockly.JavaScript.valueToCode(block, 'ROLL_COLLECTION', Blockly.JavaScript.ORDER_NONE);
        const amount = `"${block.getFieldValue('ROLL_CUSTOM') || '0'}"`;
        const regex = /(?!^|.$)["]/gm;
        const code = collection ? `${amount} + ${collection}` : `"${amount}"`;

        return [code.replace(regex, ''), Blockly.JavaScript.ORDER_ATOMIC];
    },
});

// Extract Dice Info

defineBlock({
    name: BlockNames.RetrieveRollTotal,
    JSON: {
        args0: [
            {
                check: BlockTypes.RollCollection,
                name: 'ROLL_COLLECTION',
                type: 'input_value',
            },
        ],
        colour: 120,
        inputsInline: true,
        message0: 'Dice total of: %1',
        output: BlockTypes.Number,
        tooltip: 'Get the numeric total of the dice roll, requires the dice to be rolled first',
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'ROLL_COLLECTION', Blockly.JavaScript.ORDER_NONE) ||
            `await new Roll("0")`;
        const code = `(${collection}).total`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

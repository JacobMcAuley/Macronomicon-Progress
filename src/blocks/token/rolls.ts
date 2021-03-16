import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.RollAbilities,
    init: function () {
        this.appendDummyInput()
            .appendField('Roll')
            .appendField(
                new Blockly.FieldDropdown(Object.entries(CONFIG.DND5E.abilities).map(([k, v]) => [v, k])),
                'ABILITY',
            )
            .appendField(
                new Blockly.FieldDropdown([
                    ['save', 'rollAbilitySave'],
                    ['check', 'rollAbilityTest'],
                    ['situational', 'rollAbility'],
                ]),
                'TYPE',
            )
            .appendField('check to chat');
    },
    JSON: {
        colour: 0,
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) => {
        const ability = block.getFieldValue('ABILITY') || 'str';
        const type = block.getFieldValue('TYPE') || 'rollAbility';
        return `target.actor.${type}("${ability}")`;
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
    name: BlockNames.RollChat,
    JSON: {
        args0: [
            {
                check: BlockTypes.RollInfo,
                name: 'ROLL_FORMULA',
                type: 'input_value',
            },
        ],
        colour: 0,
        inputsInline: true,
        message0: 'Roll Dice Formula: %1 to chat',
        nextStatement: BlockTypes.ActorUpdate,
        previousStatement: BlockTypes.ActorUpdate,
        tooltip: 'Used to output a roll formula to chat',
    },
    generator: (_, block) => {
        const collection = Blockly.JavaScript.valueToCode(block, 'ROLL_FORMULA', Blockly.JavaScript.ORDER_NONE);

        return `new Roll(${collection}).toMessage();`;
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
        output: [BlockTypes.RollInfo, BlockTypes.Number],
    },
    generator: (_, block) => {
        const collection = Blockly.JavaScript.valueToCode(block, 'ROLL_COLLECTION', Blockly.JavaScript.ORDER_NONE);
        const amount = block.getFieldValue('ROLL_AMOUNT') || '0';
        const rollType = block.getFieldValue('ROLL_TYPE') || 'd0';

        const code = collection ? `"${amount}${rollType} + ${collection}"` : `"${amount}${rollType}"`;
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
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
        output: [BlockTypes.RollInfo, BlockTypes.Number],
    },
    generator: (_, block) => {
        const collection = Blockly.JavaScript.valueToCode(block, 'ROLL_COLLECTION', Blockly.JavaScript.ORDER_NONE);
        const amount = block.getFieldValue('ROLL_CUSTOM') || '0';
        const code = collection ? `"${amount} + ${collection}"` : `"${amount}"`;
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    },
});

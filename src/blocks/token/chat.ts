import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.ChatAloud,
    JSON: {
        args0: [
            {
                check: 'String',
                name: 'QUOTE',
                text: `Here's Johnny!`,
                type: 'field_input',
            },
        ],
        colour: 77,
        inputsInline: true,
        message0: 'Say %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) => `
      ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: target }),
        content: "${block.getFieldValue('QUOTE')}"
      }, {chatBubble: true});
    `,
});

// TODO - Add some data for the chat message
defineBlock({
    name: BlockNames.RollChat,
    JSON: {
        args0: [
            {
                check: BlockTypes.RollCollection,
                name: 'ROLL_FORMULA',
                type: 'input_value',
            },
        ],
        colour: 77,
        inputsInline: true,
        message0: 'Display Dice Roll: %1',
        nextStatement: BlockTypes.ActorUpdate,
        previousStatement: BlockTypes.ActorUpdate,
        tooltip: 'Used to output a roll formula to chat',
    },
    generator: (_, block) => {
        const formula =
            Blockly.JavaScript.valueToCode(block, 'ROLL_FORMULA', Blockly.JavaScript.ORDER_NONE) ||
            "(await new Roll('0'))";
        return `${formula}.toMessage();`;
    },
});

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
        colour: 77,
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) => {
        const ability = block.getFieldValue('ABILITY') || 'str';
        const type = block.getFieldValue('TYPE') || 'rollAbility';
        return `target.actor.${type}("${ability}");`;
    },
});

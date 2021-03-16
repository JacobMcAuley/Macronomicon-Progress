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

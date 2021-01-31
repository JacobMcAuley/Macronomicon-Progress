import * as Blockly from 'blockly';
import { BlockNames } from './block-definitions';

const BlockJSON = {
    [BlockNames.SayAloud]: {
        args0: [
            {
                check: 'String',
                name: 'VALUE',
                type: 'input_value',
            },
        ],
        colour: 100,
        message0: 'Say message %1 aloud',
        output: false,
    },
};

Blockly.Blocks[BlockNames.SayAloud] = {
    init: function (this: Blockly.Block) {
        this.jsonInit(BlockJSON[BlockNames.SayAloud]);
    },
};

/* Generators */

Blockly.JavaScript[BlockNames.SayAloud] = function (block) {
    const msg = block.getFieldValue('CHAT_MESSAGE_INPUT');

    return `
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({token: canvas.tokens.controlled[0]}),
            content: "${msg}"
        }, {chatBubble : true})
    `;
};

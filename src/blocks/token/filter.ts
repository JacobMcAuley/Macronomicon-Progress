import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `
            Array.from(${collection}).filter(
                ({ data }) => data.disposition === TOKEN_DISPOSITIONS.HOSTILE
            )
        `;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
    name: BlockNames.FilterHostile,
    JSON: {
        colour: 50,
        args0: [
            {
                name: 'TARGET_COLLECTION',
                type: 'input_value',
                check: BlockTypes.ActorCollection,
            },
        ],
        message0: 'enemy %1',
        output: [BlockTypes.Collection, BlockTypes.ActorCollection],
        tooltip: 'Only enemy tokens',
    },
});

defineBlock({
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `
            Array.from(${collection}).filter(
                ({ data }) => data.disposition === TOKEN_DISPOSITIONS.FRIENDLY
            )
        `;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
    name: BlockNames.FilterFriendly,
    JSON: {
        colour: 50,
        args0: [
            {
                name: 'TARGET_COLLECTION',
                type: 'input_value',
                check: BlockTypes.ActorCollection,
            },
        ],
        message0: 'friendly %1',
        output: [BlockTypes.Collection, BlockTypes.ActorCollection],
        tooltip: 'Only friendly tokens',
    },
});

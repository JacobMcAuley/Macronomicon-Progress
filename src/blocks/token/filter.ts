import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.TokensFilterHostile,
    JSON: {
        args0: [
            {
                name: 'TARGET_TOKEN_COLLECTION',
                type: 'input_value',
                check: BlockTypes.TokenCollection,
            },
        ],
        message0: '%1 that is hostile',
        output: BlockTypes.TokenCollection,
        tooltip: 'Only enemy tokens',
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection})
          .filter(({ data }) => data.disposition === TOKEN_DISPOSITIONS.HOSTILE)`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterFriendly,
    JSON: {
        args0: [
            {
                name: 'TARGET_TOKEN_COLLECTION',
                type: 'input_value',
                check: BlockTypes.TokenCollection,
            },
        ],
        message0: '%1 that is friendly',
        output: BlockTypes.TokenCollection,
        tooltip: 'Only friendly tokens',
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection}).filter(({ data }) => data.disposition === TOKEN_DISPOSITIONS.FRIENDLY)`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterPlayer,
    JSON: {
        args0: [
            {
                name: 'TARGET_TOKEN_COLLECTION',
                type: 'input_value',
                check: BlockTypes.TokenCollection,
            },
        ],
        message0: '%1 that is a player',
        output: BlockTypes.TokenCollection,
        tooltip: 'Only player tokens',
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection}).filter(({ actor }) => actor.data.type === "character")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterNPC,
    JSON: {
        args0: [
            {
                name: 'TARGET_TOKEN_COLLECTION',
                type: 'input_value',
                check: BlockTypes.TokenCollection,
            },
        ],
        message0: '%1 that is an npc',
        output: BlockTypes.TokenCollection,
        tooltip: 'Only NPC tokens',
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection}).filter(({ actor }) => actor.data.type === "npc")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterSelected,
    JSON: {
        args0: [
            {
                name: 'TARGET_TOKEN_COLLECTION',
                type: 'input_value',
                check: BlockTypes.TokenCollection,
            },
        ],
        message0: '%1 that is selected',
        output: BlockTypes.TokenCollection,
        tooltip: 'Gets all the currently selected tokens within the scene',
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection}).filter((token) => canvas.tokens.controlled.includes(token))`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterNamed,
    JSON: {
        args0: [
            {
                name: 'TARGET_TOKEN_COLLECTION',
                type: 'input_value',
                check: BlockTypes.TokenCollection,
            },
            {
                name: 'TOKEN_NAME',
                type: 'field_input',
                check: BlockTypes.String,
            },
        ],
        message0: '%1 that has token name %2',
        output: BlockTypes.TokenCollection,
        tooltip: 'Filter tokens by name',
    },
    generator: (_, block) => {
        const targetName = block.getFieldValue('TOKEN_NAME');
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection}).filter(({ data }) => data.name === "${targetName}")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterActorNamed,
    JSON: {
        args0: [
            {
                name: 'TOKEN_NAME',
                type: 'field_input',
                check: BlockTypes.String,
            },
            {
                name: 'TARGET_TOKEN_COLLECTION',
                type: 'input_value',
                check: BlockTypes.TokenCollection,
            },
        ],
        message0: '%1 that has an actor named %2',
        output: BlockTypes.TokenCollection,
        tooltip: 'Filter tokens by actor name',
    },
    generator: (_, block) => {
        const targetName = block.getFieldValue('TOKEN_NAME');
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_TOKEN_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection}).filter(({ actor }) => actor.data.name === "${targetName}")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

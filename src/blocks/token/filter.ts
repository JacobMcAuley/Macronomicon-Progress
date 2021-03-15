import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection})
            .filter(({ data }) => data.disposition === TOKEN_DISPOSITIONS.HOSTILE)`;
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
        const code = `(${collection})
                .filter(({ data }) => data.disposition === TOKEN_DISPOSITIONS.FRIENDLY)`;
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

defineBlock({
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection})
                .filter(({ actor }) => actor.data.type === "character")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
    name: BlockNames.FilterPCs,
    JSON: {
        colour: 50,
        args0: [
            {
                name: 'TARGET_COLLECTION',
                type: 'input_value',
                check: BlockTypes.ActorCollection,
            },
        ],
        message0: 'player %1',
        output: [BlockTypes.Collection, BlockTypes.ActorCollection],
        tooltip: 'Only PC tokens',
    },
});

defineBlock({
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const code = `(${collection})
                .filter(({ actor }) => actor.data.type === "npc")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
    name: BlockNames.FilterNPCs,
    JSON: {
        colour: 50,
        args0: [
            {
                name: 'TARGET_COLLECTION',
                type: 'input_value',
                check: BlockTypes.ActorCollection,
            },
        ],
        message0: 'NPC %1',
        output: [BlockTypes.Collection, BlockTypes.ActorCollection],
        tooltip: 'Only NPC tokens',
    },
});

defineBlock({
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const targetName = block.getFieldValue('TARGET_NAME');
        const code = `(${collection})
                .filter(({ actor }) => actor.data.name.match(new RegExp("${targetName}", "i")))`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
    name: BlockNames.FilterPCsNamed,
    JSON: {
        colour: 50,
        args0: [
            {
                name: 'TARGET_COLLECTION',
                type: 'input_value',
                check: BlockTypes.ActorCollection,
            },
            {
                name: 'TARGET_NAME',
                type: 'field_input',
                check: 'String',
            },
        ],
        // inputsInline: true,
        message0: 'named %2 %1',
        output: [BlockTypes.Collection, BlockTypes.ActorCollection],
        tooltip: 'Only named (input)',
    },
});

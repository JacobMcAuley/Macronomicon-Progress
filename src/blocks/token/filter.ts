import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.TokenFilterAnd,
    JSON: {
        args0: [
            {
                name: 'FILTER_0',
                type: 'input_value',
                check: BlockTypes.TokenCollectionFilter,
            },
            {
                name: 'FILTER_1',
                type: 'input_value',
                check: BlockTypes.TokenCollectionFilter,
            },
        ],
        output: BlockTypes.TokenCollectionFilter,
        message0: 'both %1 and %2',
    },
    generator: (_, block) => {
        const left = Blockly.JavaScript.valueToCode(block, 'FILTER_0', Blockly.JavaScript.ORDER_NONE);
        const right = Blockly.JavaScript.valueToCode(block, 'FILTER_1', Blockly.JavaScript.ORDER_NONE);

        const code = `((...args) => (${left}(...args) && ${right}(...args)))`;

        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokenFilterOr,
    JSON: {
        args0: [
            {
                name: 'FILTER_0',
                type: 'input_value',
                check: BlockTypes.TokenCollectionFilter,
            },
            {
                name: 'FILTER_1',
                type: 'input_value',
                check: BlockTypes.TokenCollectionFilter,
            },
        ],
        output: BlockTypes.TokenCollectionFilter,
        message0: 'either %1 or %2',
    },
    generator: (_, block) => {
        const left = Blockly.JavaScript.valueToCode(block, 'FILTER_0', Blockly.JavaScript.ORDER_NONE);
        const right = Blockly.JavaScript.valueToCode(block, 'FILTER_1', Blockly.JavaScript.ORDER_NONE);

        if (block.allInputsFilled()) {
            const code = `((...args) => (${left}(...args) || ${right}(...args)))`;
            return [code, Blockly.JavaScript.ORDER_NONE];
        }

        return [`() => true`, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterHostile,
    JSON: {
        message0: 'that are hostile',
        output: BlockTypes.TokenCollectionFilter,
        tooltip: 'Only enemy tokens',
    },
    generator: () => {
        const code = `(({ data }) => data.disposition === TOKEN_DISPOSITIONS.HOSTILE)`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterFriendly,
    JSON: {
        message0: 'that are friendly',
        output: BlockTypes.TokenCollectionFilter,
        tooltip: 'Only friendly tokens',
    },
    generator: () => {
        const code = `(({ data }) => data.disposition === TOKEN_DISPOSITIONS.FRIENDLY)`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterPlayer,
    JSON: {
        message0: 'that are players',
        output: BlockTypes.TokenCollectionFilter,
        tooltip: 'Only player tokens',
    },
    generator: () => {
        const code = `(({ actor }) => actor.data.type === "character")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterNPC,
    JSON: {
        message0: 'that are npcs',
        output: BlockTypes.TokenCollectionFilter,
        tooltip: 'Only NPC tokens',
    },
    generator: () => {
        const code = `(({ actor }) => actor.data.type === "npc")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterSelected,
    JSON: {
        message0: 'that are selected',
        output: BlockTypes.TokenCollectionFilter,
        tooltip: 'Only selected tokens within the scene',
    },
    generator: () => {
        const code = `((token) => canvas.tokens.controlled.includes(token))`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterNamed,
    JSON: {
        args0: [
            {
                name: 'NAME',
                type: 'field_input',
                check: BlockTypes.String,
            },
        ],
        message0: 'that are named %1',
        output: BlockTypes.TokenCollectionFilter,
        tooltip: 'Filter tokens by name',
    },
    generator: (_, block) => {
        const targetName = block.getFieldValue('NAME');
        const code = `(({ data }) => data.name === "${targetName}")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

defineBlock({
    name: BlockNames.TokensFilterActorNamed,
    JSON: {
        args0: [
            {
                name: 'NAME',
                type: 'field_input',
                check: BlockTypes.String,
            },
        ],
        message0: 'with actors named %1',
        output: BlockTypes.TokenCollectionFilter,
        tooltip: 'Filter tokens by actor name',
    },
    generator: (_, block) => {
        const targetName = block.getFieldValue('NAME');
        const code = `(({ actor }) => actor.data.name === "${targetName}")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

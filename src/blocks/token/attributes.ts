import Blockly from 'blockly';

import { BlockColours, BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.TokenRetrieveHealth,
    JSON: {
        args0: [{ check: [BlockTypes.Token], name: 'TOKEN', type: 'input_value' }],
        colour: BlockColours.Purple,
        message0: 'Current health of %1',
        output: BlockTypes.Number,
        system: '5e',
    },
    generator: (_, block) => [
        `Number(${Blockly.JavaScript.valueToCode(
            block,
            'TOKEN',
            Blockly.JavaScript.ORDER_NONE,
        )}.actor.data.data.attributes.hp.value)`,
        Blockly.JavaScript.ORDER_ATOMIC,
    ],
});

defineBlock({
    name: BlockNames.TokenRetrieveLevel,
    JSON: {
        args0: [{ check: [BlockTypes.Token], name: 'TOKEN', type: 'input_value' }],
        colour: BlockColours.Purple,
        message0: 'Current level of %1',
        output: BlockTypes.Number,
        system: '5e',
    },
    generator: (_, block) => [
        `Number(${Blockly.JavaScript.valueToCode(
            block,
            'TOKEN',
            Blockly.JavaScript.ORDER_NONE,
        )}.actor.data.data.details.level)`,
        Blockly.JavaScript.ORDER_ATOMIC,
    ],
});

defineBlock({
    name: BlockNames.TokenRetrieveAC,
    JSON: {
        args0: [{ check: [BlockTypes.Token], name: 'TOKEN', type: 'input_value' }],
        colour: BlockColours.Purple,
        message0: 'Current AC of %1',
        output: BlockTypes.Number,
        system: '5e',
    },
    generator: (_, block) => [
        `Number(${Blockly.JavaScript.valueToCode(
            block,
            'TOKEN',
            Blockly.JavaScript.ORDER_NONE,
        )}.actor.data.data.attributes.ac.value)`,
        Blockly.JavaScript.ORDER_ATOMIC,
    ],
});

defineBlock({
    name: BlockNames.TokenRetrieveResource,
    JSON: {
        args0: [
            { check: [BlockTypes.Token], name: 'TOKEN', type: 'input_value' },
            {
                name: 'RESOURCE_NUMBER',
                options: [
                    ['primary', 'primary'],
                    ['secondary', 'secondary'],
                    ['tertiary', 'tertiary'],
                ],
                type: 'field_dropdown',
            },
            {
                name: 'RESOURCE_REQUESTED',
                options: [
                    ['current value', 'value'],
                    ['max value', 'max'],
                ],
                type: 'field_dropdown',
            },
        ],
        colour: BlockColours.Purple,
        inputsInline: true,
        message0: 'get %2 resource %3 of %1',
        output: BlockTypes.Number,
        system: '5e',
    },
    generator: (_, block) => [
        `Number(${Blockly.JavaScript.valueToCode(
            block,
            'TOKEN',
            Blockly.JavaScript.ORDER_NONE,
        )}.actor.data.data.resources.${block.getFieldValue('RESOURCE_NUMBER')}.${block.getFieldValue(
            'RESOURCE_REQUESTED',
        )})`,
        Blockly.JavaScript.ORDER_ATOMIC,
    ],
});

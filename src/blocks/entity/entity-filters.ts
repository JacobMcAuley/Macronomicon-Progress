import * as Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';

const blocks = {
    [BlockNames.EntitySelectedFilter]: {
        colour: 100,
        helpUrl: '',
        inputsInline: false,
        message0: 'currently selected',
        output: [true, BlockTypes.EntityFilter],
        tooltip: '',
    },
    [BlockNames.EntityAttributeFilter]: {
        args0: [
            {
                align: 'RIGHT',
                check: BlockTypes.EntityAttribute,
                name: 'INPUT_ATTRIBUTE',
                type: 'input_value',
            },
            {
                align: 'RIGHT',
                name: 'INPUT_OPERATOR',
                options: [
                    ['EQUAL', '==='],
                    ['NOT EQUAL', '!=='],
                    ['LESS THAN', '<'],
                    ['LESS THAN OR EQUAL', '<='],
                    ['GREATER THAN', '>'],
                    ['GREATHER THAN OR EQUAL', '>='],
                ],
                type: 'field_dropdown',
            },
            {
                align: 'RIGHT',
                name: 'INPUT_COMPARISON_VALUE',
                type: 'input_value',
            },
        ],
        colour: 100,
        helpUrl: '',
        message0: 'critera: %1 operator: %2 value: %3',
        output: [true, BlockTypes.EntityFilter],
        tooltip: '',
    },
};

Blockly.Blocks['entity_selected_filter'] = {
    init: function (this: Blockly.Block) {
        this.jsonInit(blocks[BlockNames.EntitySelectedFilter]);
    },
};

Blockly.Blocks['entity_attribute_filter'] = {
    init: function (this: Blockly.Block) {
        this.jsonInit(blocks[BlockNames.EntityAttributeFilter]);
        this.setInputsInline(true);
    },
};

/* Generators */
Blockly.JavaScript[BlockNames.EntitySelectedFilter] = function () {
    const code = '((entity) => entity.data._id === canvas.tokens.controlled[0]?.id)';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

const PATH_PART_REDUCER_BRACKET = [(prev: string, next: string) => `${prev}[${next}]`] as const;
// const PATH_PART_REDUCER_DOT = [(prev: string, next: string) => `${prev}.${next}`, ''] as const;

Blockly.JavaScript[BlockNames.EntityAttributeFilter] = function (block) {
    const inputAttribute = Blockly.JavaScript.valueToCode(block, 'INPUT_ATTRIBUTE', Blockly.JavaScript.ORDER_NONE);

    const valuePath = inputAttribute.split('.').reduce(...PATH_PART_REDUCER_BRACKET);

    const operator: string = block.getFieldValue('INPUT_OPERATOR');

    const valueComparison = Blockly.JavaScript.valueToCode(
        block,
        'INPUT_COMPARISON_VALUE',
        Blockly.JavaScript.ORDER_NONE,
    );
    // TODO: Assemble JavaScript into code variable.
    const code = `((entity) => entity${valuePath} ${operator} ${valueComparison})`;

    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

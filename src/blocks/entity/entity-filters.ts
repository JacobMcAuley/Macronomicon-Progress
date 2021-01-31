import * as Blockly from 'blockly';
import { formatCode } from '../../code-formatter';
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
                check: BlockTypes.Operator,
                name: 'INPUT_OPERATOR',
                type: 'input_value',
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
Blockly.JavaScript[BlockNames.EntitySelectedFilter] = function (block) {
    const code = `((token) => token.data._id === canvas.tokens.controlled[0])`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript[BlockNames.EntityAttributeFilter] = function (block) {
    const value_input_attribute = Blockly.JavaScript.valueToCode(
        block,
        'INPUT_ATTRIBUTE',
        Blockly.JavaScript.ORDER_ATOMIC,
    );
    const value_input_operator = Blockly.JavaScript.valueToCode(
        block,
        'INPUT_OPERATOR',
        Blockly.JavaScript.ORDER_ATOMIC,
    );
    const value_input_comparison_value = Blockly.JavaScript.valueToCode(
        block,
        'INPUT_COMPARISON_VALUE',
        Blockly.JavaScript.ORDER_ATOMIC,
    );
    // TODO: Assemble JavaScript into code variable.
    const code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

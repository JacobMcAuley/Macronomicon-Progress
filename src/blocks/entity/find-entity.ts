import * as Blockly from 'blockly';
import { formatCode } from '../../code-formatter';

import { BlockNames, BlockTypes } from '../block-definitions';

const BlockJSON = {
    [BlockNames.FindEntity]: {
        args0: [
            {
                name: 'FIELD_DROPDOWN_ENTITY_TYPE',
                options: [
                    ['actor', 'actors'],
                    ['token', 'tokens'],
                ],
                type: 'field_dropdown',
            },
            {
                check: 'EntityFilter',
                name: 'INPUT_ENTITY_FILTER',
                type: 'input_value',
            },
        ],
        colour: 100,
        helpUrl: '',
        message0: 'get %1 by %2',
        setNextStatement: [true, BlockTypes.Entity],
        tooltip: 'Find',
    },
};

Blockly.Blocks[BlockNames.FindEntity] = {
    init: function (this: Blockly.Block) {
        this.jsonInit(BlockJSON[BlockNames.FindEntity]);
    },
};

/* generators */

Blockly.JavaScript[BlockNames.FindEntity] = (block) => {
    const entityType = block.getFieldValue('FIELD_DROPDOWN_ENTITY_TYPE');
    const entityFilter = Blockly.JavaScript.valueToCode(block, 'INPUT_ENTITY_FILTER', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    const code = formatCode(`
        game.${entityType}.objects.children.find(${entityFilter})
    `);
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

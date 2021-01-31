import * as Blockly from 'blockly';
import { BlockNames, BlockTypes } from '../block-definitions';

const blocks = {
    [BlockNames.EntityNameAttribute]: {
        colour: 100,
        helpUrl: '',
        inputsInline: false,
        message0: 'Name',
        output: [true, BlockTypes.EntityAttribute],
        tooltip: '',
    },
    [BlockNames.EntityIdAttribute]: {
        colour: 100,
        helpUrl: '',
        inputsInline: false,
        message0: 'ID',
        output: [true, BlockTypes.EntityAttribute],
        tooltip: '',
    },
};

Blockly.Blocks[BlockNames.EntityNameAttribute] = {
    init: function (this: Blockly.Block) {
        this.jsonInit(blocks[BlockNames.EntityNameAttribute]);
    },
};

Blockly.Blocks[BlockNames.EntityIdAttribute] = {
    init: function (this: Blockly.Block) {
        this.jsonInit(blocks[BlockNames.EntityIdAttribute]);
    },
};

/* Generators */

Blockly.JavaScript[BlockNames.EntityNameAttribute] = () => [`data.name`, Blockly.JavaScript.ORDER_NONE];

Blockly.JavaScript[BlockNames.EntityIdAttribute] = () => [`data._id`, Blockly.JavaScript.ORDER_NONE];

import * as Blockly from 'blockly';

Blockly.Blocks['find_entity'] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendValueInput('FIND_ENTITY_TYPE')
            .appendField('find')
            .appendField(
                new Blockly.FieldDropdown([
                    ['actor', 'ENTITY_TYPE_ACTOR'],
                    ['token', 'ENTITY_TYPE_token'],
                ]),
                'FIND_ENTITY_TYPE_DROPDOWN',
            )
            .appendField('by')
            .setCheck(['EntityFilter']);

        this.setColour(100);

        this.setNextStatement(true, 'Entity');
    },
};

Blockly.Blocks['entity_name'] = {
    init: function (this: Blockly.Block) {
        this.appendDummyInput().appendField('name');
        this.setOutput(true, 'EntityAttribute');
        this.setColour(100);
    },
};

Blockly.Blocks['entity_id'] = {
    init: function (this: Blockly.Block) {
        this.appendDummyInput().appendField('id');
        this.setOutput(true, 'EntityAttribute');
        this.setColour(100);
    },
};

Blockly.Blocks['entity_attribute_filter'] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput('ENTITY_ATTRIBUTE_NAME').appendField('attribute').setCheck('EntityAttribute');
        this.appendValueInput('ENTITY_ATTRIBUTE_VALUE').appendField('equal to').setCheck('String');

        this.setOutput(true, 'EntityFilter');
        this.setColour(100);
    },
};

Blockly.Blocks['entity_selected_filter'] = {
    init: function (this: Blockly.Block) {
        this.appendDummyInput().appendField('currently selected');
        this.setOutput(true, 'EntityFilter');
        this.setColour(100);
    },
};

Blockly.Blocks['update_entity_attribute'] = {
    init: function (this: Blockly.Block) {
        this.setPreviousStatement(true, 'Entity');
        this.appendValueInput('ENTITY_ATTRIBUTE').appendField('update').setCheck('EntityAttribute');
        this.setOutput(false);
        this.setColour(220);
    },
};

/*
    Generators
*/

Blockly.JavaScript['find_entity'] = function () {
    // const filter = Blockly.JavaScript.valueToCode(block, 'TOKEN_FILTER', Blockly.JavaScript.ORDER_NONE);
    return `TODO`;
};

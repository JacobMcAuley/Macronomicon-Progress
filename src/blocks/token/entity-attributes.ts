import Blockly, { Block } from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.RetrieveHP,
    JSON: {
        colour: 47,
        inputsInline: true,
        message0: 'entity health',
        output: BlockTypes.Number,
    },
    // TODO - This technically isn't the token's health, we might need to check it on un-linked tokens
    // Suggestion - data.actorData.data.attributes.hp.value?
    generator: () => [`Number(target.actor.data.data.attributes.hp.value)`, Blockly.JavaScript.ORDER_ATOMIC],
});

defineBlock({
    name: BlockNames.RetrieveAttribute,
    init: function () {
        this.appendDummyInput()
            .appendField('Entity')
            .appendField(
                new Blockly.FieldDropdown(Object.entries(CONFIG.DND5E.abilities).map(([k, v]) => [v, k])),
                'ABILITY',
            )
            .appendField(
                new Blockly.FieldDropdown([
                    ['save', 'save'],
                    ['modifier', 'mod'],
                ]),
                'TYPE',
            );
    },
    JSON: {
        colour: 0,
        output: BlockTypes.Number,
    },
    generator: (_, block) => {
        const ability = block.getFieldValue('ABILITY') || 'str';
        const type = block.getFieldValue('TYPE') || 'rollAbility';
        // TODO - Do we need to get from rolldata?
        return [`(target.actor.data.data.abilities.${ability}.${type})`, Blockly.JavaScript.ORDER_ATOMIC];
    },
});

Blockly.Blocks['list_roll_create_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this {Blockly.Block}
     */
    init: function (this: Blockly.Block) {
        this.appendValueInput('ROLL_FORMULA').appendField('Dice Formula: ').setCheck(BlockTypes.RollInfo);

        this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
        this.setStyle('list_blocks');
        this.itemCount_ = 0;
        this.updateShape_();
        this.setOutput(true, BlockTypes.RollCollection);
        this.setMutator(new Blockly.Mutator(['list_roll_parameter']));
        this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },

    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this {Blockly.Block}
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('list_roll_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('list_roll_parameter');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY').appendField(''); // with no additional parameters
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i).setAlign(Blockly.ALIGN_RIGHT);
                if (i == 0) {
                    input.appendField('with parameters');
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    },
};

Blockly.Blocks['list_roll_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this {Blockly.Block}
     */
    init: function (this: Blockly.Block) {
        this.setStyle('list_blocks');
        this.appendDummyInput().appendField('Additional Parameter');
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_CONTAINER_TOOLTIP']);
        this.contextMenu = false;
    },
};

Blockly.Blocks['list_roll_parameter'] = {
    /**
     * Mutator block for adding items.
     * @this {Blockly.Block}
     */
    init: function (this: Blockly.Block) {
        this.setStyle('list_blocks');
        this.appendDummyInput().appendField('Argument');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TOOLTIP']);
        this.contextMenu = false;
    },
};

Blockly.JavaScript[BlockNames.ListRollCreate] = function (block) {
    const elements = Array.from({ length: block.itemCount_ }).map((_, index) => `arg${index}`);

    const jsonString = elements.reduce(
        (accumulator, currentValue, index) =>
            accumulator +
            currentValue +
            ' : ' +
            (Blockly.JavaScript.valueToCode(block, `ADD${index}`, Blockly.JavaScript.ORDER_NONE) || '0') +
            ', ',
        '',
    );

    const collection =
        elements.length > 0
            ? (Blockly.JavaScript.valueToCode(block, 'ROLL_FORMULA', Blockly.JavaScript.ORDER_NONE) || `"0"`).slice(
                  0,
                  -1,
              ) +
              ' + @' +
              elements.join('+ @') +
              '"'
            : Blockly.JavaScript.valueToCode(block, 'ROLL_FORMULA', Blockly.JavaScript.ORDER_NONE) || `"0"`;

    return [`await new Roll(${collection}, {${jsonString}})`, Blockly.JavaScript.ORDER_NONE];
};

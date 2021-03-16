import Blockly from 'blockly';

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
        return [`Number(target.actor.data.data.abilities.${ability}.${type})`, Blockly.JavaScript.ORDER_ATOMIC];
    },
});

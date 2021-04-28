import Blockly from 'blockly';

import type { AutocompleteTextInput } from '../../fields/autocomplete/field';
import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

const getRollData = (blockType: BlockTypes | undefined) => {
    const actor = Array.from(game.actors?.values() ?? [])?.[0] as Actor;
    const item = Array.from(actor?.items || [])[0] as Item | undefined;
    switch (blockType) {
        case BlockTypes.Actor:
        case BlockTypes.Token:
            return (actor?.getRollData() as Json) ?? {};
        case BlockTypes.Item:
            return (item?.getRollData() as Json) ?? {};
        default:
            return {};
    }
};

defineBlock({
    name: BlockNames.InputRoll,
    JSON: {
        args0: [
            {
                name: 'FORMULA',
                type: 'field_autocomplete_input',
            },
            {
                name: 'INPUT',
                type: 'input_value',
                check: [BlockTypes.Actor, BlockTypes.Item, BlockTypes.Token],
            },
        ],

        message0: 'roll %1 for %2',
        output: BlockTypes.Number,
        tooltip: 'Roll formula with entity data',
    },
    generator: (_, block) => {
        const inputBlockType = block.getInputTargetBlock('INPUT')?.outputConnection?.getCheck()?.[0] as BlockTypes;
        const input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_NONE);
        const rollDataCode =
            inputBlockType === BlockTypes.Item ? `${input}.getRollData()` : `${input}.actor.getRollData()`;

        const formula = block.getFieldValue('FORMULA');
        const code = `new Roll('${formula}', ${rollDataCode}).roll().total`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
    onChange: (block) => {
        const formulaField = block.getField('FORMULA') as AutocompleteTextInput;
        const inputBlockType = block.getInputTargetBlock('INPUT')?.outputConnection?.getCheck()?.[0] as BlockTypes;

        formulaField.rollData = getRollData(inputBlockType);
        formulaField.forceRerender();
    },
});

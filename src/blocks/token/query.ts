import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    generator: () => ['canvas.tokens.controlled', Blockly.JavaScript.ORDER_NONE],
    name: BlockNames.SelectedTokens,
    JSON: {
        colour: 100,
        message0: 'selected token',
        output: [BlockTypes.Collection, BlockTypes.ActorCollection],
        tooltip: 'Gets all the currently selected tokens within the scene',
    },
});

defineBlock({
    generator: () => ['canvas.tokens.placeables', Blockly.JavaScript.ORDER_NONE],
    name: BlockNames.SceneTokens,
    JSON: {
        colour: 100,
        message0: 'scene token',
        output: [BlockTypes.Collection, BlockTypes.ActorCollection],
        tooltip: 'Gets all the tokens within the scene',
    },
});

defineBlock({
    // Move to a different page. Generic type for comparisons
    name: BlockNames.UserNumber,
    JSON: {
        args0: [
            {
                check: BlockTypes.RollInfo,
                name: 'NUM',
                text: '0',
                type: 'field_input',
            },
        ],
        colour: 47,
        message0: '%1',
        output: BlockTypes.Number,
    },
    generator: (_, block) => {
        var code = Number(block.getFieldValue('NUM'));
        var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION;
        return [code, order];
    },
});

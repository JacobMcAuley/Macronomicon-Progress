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

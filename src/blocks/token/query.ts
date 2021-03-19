import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.TokensFindScene,
    JSON: {
        message0: 'scene tokens',
        output: BlockTypes.TokenCollection,
        tooltip: 'Gets all the tokens within the scene',
    },
    generator: () => ['canvas.tokens.placeables', Blockly.JavaScript.ORDER_NONE],
});

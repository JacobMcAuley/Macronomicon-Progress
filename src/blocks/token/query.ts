import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.TokensFindScene,
    JSON: {
        args0: [
            {
                name: 'FILTER',
                type: 'input_value',
                check: [BlockTypes.TokenCollectionFilter],
            },
        ],
        message0: 'tokens %1',
        output: BlockTypes.TokenCollection,
        tooltip: 'Gets all the tokens within the scene',
    },
    generator: (_, block) => {
        const filter = Blockly.JavaScript.valueToCode(block, 'FILTER', Blockly.JavaScript.ORDER_NONE);

        const code = !block.allInputsFilled()
            ? 'canvas.tokens.placeables'
            : `(canvas.tokens.placeables).filter(${filter})`;

        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

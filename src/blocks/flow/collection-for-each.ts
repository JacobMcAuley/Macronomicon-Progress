import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

function T(collection: string, actions: string) {
    return `
        (${collection})
            .reduce(async (prevPromise, target) => {
                await prevPromise;
                ${actions};
            }, Promise.resolve())
    `;
}

defineBlock({
    name: BlockNames.CollectionForEach,
    JSON: {
        args0: [
            {
                check: BlockTypes.Collection,
                name: 'TARGET_COLLECTION',
                type: 'input_value',
            },
        ],
        message0: 'For each %1',
        colour: 100,
        args1: [
            {
                name: 'TARGET_ACTIONS',
                type: 'input_statement',
            },
        ],
        message1: 'do %1',
        previousStatement: null,
        nextStatement: null,
    },
    generator: (_, block) => {
        const collection =
            Blockly.JavaScript.valueToCode(block, 'TARGET_COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';
        const actions = Blockly.JavaScript.statementToCode(block, 'TARGET_ACTIONS') || '';
        return T(collection, actions);
    },
});

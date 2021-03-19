import Blockly from 'blockly';

import { BlockNames } from '../block-definitions';
import { defineBlock } from '../util';
import { CONTEXT_MUTATOR_NAME } from './context-mutator';

defineBlock({
    name: BlockNames.EntityContextItem,
    JSON: {
        args0: [
            {
                name: 'ITEM_NAME',
                type: 'field_label_serializable',
                text: '',
            },
        ],
        mutator: CONTEXT_MUTATOR_NAME,
        output: null,
        message0: '%1',
    },
    generator: (_, block) => [block.getFieldValue('ITEM_NAME'), Blockly.JavaScript.ORDER_NONE],
});

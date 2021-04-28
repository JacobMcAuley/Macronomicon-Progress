import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.ItemsFilterNamed,
    JSON: {
        args0: [
            {
                name: 'NAME',
                type: 'field_input',
                check: BlockTypes.String,
            },
        ],
        message0: 'that are named %1',
        output: BlockTypes.ItemCollectionFilter,
        tooltip: 'Filter items by name',
    },
    generator: (_, block) => {
        const targetName = block.getFieldValue('NAME');
        const code = `(({ data }) => data.name === "${targetName}")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
});

import Blockly from 'blockly';

import {
    BlockCollectionItemMap,
    BlockCollections,
    BlockColours,
    BlockNames,
} from '../block-definitions';
import { defineBlock, getInputBlock, isContextBlock } from '../util';

const DEFAULT_ITEM_NAME = 'item';

export const getItemVariableNamePlaceholder = (type: string): string => {
    if (BlockCollectionItemMap.has(type as BlockCollections)) {
        return BlockCollectionItemMap.get(type as BlockCollections)?.toLowerCase() as string;
    }
    return DEFAULT_ITEM_NAME;
};

defineBlock({
    name: BlockNames.ForEach,
    JSON: {
        args0: [
            {
                check: Array.from(BlockCollectionItemMap.keys()),
                name: 'COLLECTION',
                type: 'input_value',
            },
            {
                name: 'ITEM_NAME',
                text: DEFAULT_ITEM_NAME,
                type: 'field_input',
            },
            {
                type: 'input_dummy',
            },
            {
                name: 'LOOP_BLOCK',
                text: 'do',
                type: 'input_statement',
            },
        ],
        colour: BlockColours.Default,
        inputsInline: false,
        message0: 'for each of %1 as %2 %3 do %4',
        previousStatement: null,
        nextStatement: null,
    },
    generator: (_, block) => {
        const collection = Blockly.JavaScript.valueToCode(block, 'COLLECTION', Blockly.JavaScript.ORDER_NONE) || '[]';

        const code = `
          for (const ${block.getFieldValue('ITEM_NAME')} of ${collection}) {
            ${Blockly.JavaScript.statementToCode(block, 'LOOP_BLOCK')}
          }
        `;
        return code;
    },
    onChange: (block) => {
        const variableName = block.getFieldValue('ITEM_NAME');
        const inputBlock = getInputBlock(block, 'COLLECTION');

        block.setColour(inputBlock?.getColour() || BlockColours.Default);
        const inputBlockType = inputBlock?.outputConnection?.getCheck();

        const contextBlocks = block.workspace
            .getBlocksByType(BlockNames.EntityContextItem, false)
            .filter((childBlock) => isContextBlock(childBlock) && childBlock.contextParentId === block.id);

        if (inputBlockType) {
            if (variableName === DEFAULT_ITEM_NAME) {
                const itemVariableNamePlaceholder = getItemVariableNamePlaceholder(inputBlockType?.[0]);
                block.setFieldValue(itemVariableNamePlaceholder, 'ITEM_NAME');
            }

            const itemVariableName = block.getFieldValue('ITEM_NAME');

            contextBlocks.forEach((contextBlock) => {
                contextBlock.setFieldValue(itemVariableName, 'ITEM_NAME');
                contextBlock.setColour(block.getColour());
                contextBlock.setOutput(true, [BlockCollectionItemMap.get(inputBlockType?.[0])]);
            });

            return;
        }

        contextBlocks.forEach((contextBlock) => {
            contextBlock.dispose(false);
        });
    },
});

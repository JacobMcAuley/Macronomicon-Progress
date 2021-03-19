import Blockly from 'blockly';

import { BlockColours, BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock, getInputBlock, isContextBlock } from '../util';

const DEFAULT_CONTEXT_VARIABLE_NAME = 'target';

defineBlock({
    name: BlockNames.EntityContext,
    JSON: {
        args0: [
            {
                check: Object.values(BlockTypes),
                name: 'INPUT',
                text: 'with',
                type: 'input_value',
            },
            {
                name: 'ITEM_NAME',
                text: DEFAULT_CONTEXT_VARIABLE_NAME,
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
        message0: 'with %1 as %2 %3 do %4',
        previousStatement: null,
        nextStatement: null,
    },
    generator: (_, block) => {
        const input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_NONE) || '[]';

        const code = `
          {
            const ${block.getFieldValue('ITEM_NAME')} = ${input};
            ${Blockly.JavaScript.statementToCode(block, 'LOOP_BLOCK')}
          }
        `;
        return code;
    },
    onChange: (block) => {
        const variableName = block.getFieldValue('ITEM_NAME');
        const inputBlock = getInputBlock(block, 'INPUT');

        block.setColour(inputBlock?.getColour() || BlockColours.Default);
        const inputBlockType = inputBlock?.outputConnection?.getCheck();

        const contextBlocks = block.workspace
            .getBlocksByType(BlockNames.EntityContextItem, false)
            .filter((childBlock) => isContextBlock(childBlock) && childBlock.contextParentId === block.id);

        if (inputBlockType) {
            contextBlocks.forEach((contextBlock) => {
                contextBlock.setFieldValue(variableName, 'ITEM_NAME');
                contextBlock.setColour(block.getColour());
                contextBlock.setOutput(true, inputBlockType);
            });

            return;
        }

        contextBlocks.forEach((contextBlock) => contextBlock.dispose(false));
    },
});

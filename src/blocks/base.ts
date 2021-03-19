import Blockly from 'blockly';

import { formatCode } from '../editor/code-formatter';
import { BlockColours, BlockNames } from './block-definitions';
import { defineBlock } from './util';

defineBlock({
    name: BlockNames.Base,
    JSON: {
        args0: [
            {
                name: 'MACRO_NAME',
                text: 'NAME',
                type: 'field_input',
            },
            {
                type: 'input_dummy',
            },
            {
                name: 'MACRO_BODY',
                type: 'input_statement',
            },
        ],
        colour: BlockColours.Default,
        inputsInline: true,
        message0: 'Macro %1 %2 %3',
        tooltip: 'Your macro',
    },
    generator: (_, block) => {
        const code = Blockly.JavaScript.statementToCode(block, 'MACRO_BODY');
        const macroName = block.getFieldValue('MACRO_NAME') || `${Date.now()}`;
        const matched = macroName.match(/([a-zA-Z_]+)/g);
        const macroFunctionName = `macro_${matched ? matched.join('').toLowerCase() : 'new'}`;
        try {
            return formatCode(`
            (async function ${macroFunctionName}() {
                ${code}
            })();
        `);
        } catch (e) {
            console.error(e);
            return code;
        }
    },
});

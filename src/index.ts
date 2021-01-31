import * as Blockly from 'blockly';

import './blocks';

import './styles/module.css'; // Our styles
import { createWorkspace } from './workspace';

const OUTPUT_LANGUAGE = 'JavaScript';

document.addEventListener('DOMContentLoaded', function () {
    const workspace = createWorkspace('macronomicon-workspac');

    const button = document.getElementById('blocklyButton');
    button?.addEventListener('click', function () {
        const generator = (Blockly as any)[OUTPUT_LANGUAGE];
        const code: Blockly.Generator = generator.workspaceToCode(workspace);
        console.log(code);
    });
});

import * as Blockly from 'blockly';

import './styles/module.scss'; // Our styles
import './blocks';
import { createWorkspace } from './workspace';

document.addEventListener('DOMContentLoaded', function () {
    const workspace = createWorkspace('macronomicon-workspace', {
        media: 'media/',
        trashcan: true,
    });
    const button = document.getElementById('macronomicon-convert');
    button?.addEventListener('click', function () {
        const generator = Blockly.JavaScript;
        const code = generator.workspaceToCode(workspace);
        console.log(code);
    });
});

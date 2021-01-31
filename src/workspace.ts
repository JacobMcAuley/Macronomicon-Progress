import * as Blockly from 'blockly';

import './blocks';

import toolbox from './toolbox.json';

export const createWorkspace = (selector: string): Blockly.Workspace => {
    return Blockly.inject(selector, {
        grid: {
            colour: '#ccc',
            length: 3,
            snap: true,
            spacing: 20,
        },
        media: 'media/',
        toolbox,
        trashcan: false,
        zoom: {
            controls: true,
            maxScale: 3,
            minScale: 0.3,
            pinch: true,
            scaleSpeed: 1.2,
            startScale: 1.0,
            wheel: true,
        },
    });
};

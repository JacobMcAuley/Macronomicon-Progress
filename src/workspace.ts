import Blockly from 'blockly';
import merge from 'lodash.merge';

import './blocks';
import toolbox from './toolbox.json';

export const createWorkspace = (
    selector: string | Element,
    options: Blockly.BlocklyOptions = {},
): Blockly.Workspace => {
    const workspace = Blockly.inject(
        selector,
        merge(
            {
                grid: {
                    colour: '#ccc',
                    length: 3,
                    snap: true,
                    spacing: 20,
                },
                media: 'modules/macronomicon/media/',
                move: {
                    drag: true,
                    scrollbars: false,
                    wheel: true,
                },
                toolbox,
                trashcan: false,
                zoom: {
                    controls: false,
                    maxScale: 1,
                    minScale: 1,
                    startScale: 1,
                    wheel: true,
                },
            } as Blockly.Blockly.BlocklyOptions,
            options,
        ),
    );

    const xml = '<xml><block type="macro_base" deletable="false" movable="false"></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);

    workspace.addChangeListener(Blockly.Events.disableOrphans);

    workspace.addChangeListener((event: Blockly.Events.BlockBase) => {
        if ((CONFIG.debug as unknown as { blocks: boolean; }).blocks === true) {
            console.log(event);
        }
    });

    return workspace;
};

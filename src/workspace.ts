import Blockly from 'blockly';
import merge from 'lodash.merge';

import { pluginInfo } from './blocks/connection-checker';
import { getContextToolboxContents } from './blocks/context/context-toolbox';
import './blocks';
import toolbox from './toolbox.json';

export const createWorkspace = (
    selector: string | Element,
    options: Blockly.BlocklyOptions = {},
): Blockly.WorkspaceSvg => {
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
                plugins: {
                    ...pluginInfo,
                },
                trashcan: false,
                zoom: {
                    controls: false,
                    maxScale: 1,
                    minScale: 1,
                    startScale: 1,
                    wheel: true,
                },
            },
            options,
        ),
    );

    Blockly.Events.disable();
    const xml = '<xml><block type="macro_base" deletable="false" movable="false"></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);

    workspace.addChangeListener(Blockly.Events.disableOrphans);

    workspace.addChangeListener((event: Blockly.Events.BlockBase) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (((CONFIG?.debug as unknown) as { blocks: boolean }).blocks === true) {
            console.log(event);
        }
    });

    setTimeout(() => Blockly.Events.enable(), 0);

    workspace.registerToolboxCategoryCallback('CONTEXT_VARIABLES', getContextToolboxContents);

    return workspace;
};

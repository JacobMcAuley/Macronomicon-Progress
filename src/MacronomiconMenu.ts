import * as Blockly from 'blockly';
import { formatCode } from './code-formatter';

import { createWorkspace } from './workspace';

export class MacronomiconMenu extends FormApplication {
    constructor(...args){
        super(...args);
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.template = 'modules/macronomicon/templates/macronomicon-menu.html';
        options.width = 900;
        options.height = 900;
        options.title = 'Macronomicon';
        options.closeOnSubmit = true;
        options.id = 'macronomicon';
        return options;
    }
    

    activateListeners(html) {
        const workspace = createWorkspace('macronomicon-workspace');
        $('#macronomicon-convert').on('click', async () => {
            const code = formatCode(Blockly.JavaScript.workspaceToCode(workspace));
            const macro = await Macro.create({
                command: code,
                name: 'New Macro',
                scope: 'global',
                type: 'script',
            });
            MacroDirectory.collection.get(macro.id).sheet.render(true);
        });
    }

    getData() {
        return {};
    }
}

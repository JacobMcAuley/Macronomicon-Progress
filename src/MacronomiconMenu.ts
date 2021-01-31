import * as Blockly from 'blockly';

import { createWorkspace } from './workspace';

export class MacronomiconMenu extends FormApplication {
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
    

    activateListeners() {
        $('#submitMacro').on('click', async () => {
            const workspace = createWorkspace('macronomicon-workspace');
            const code = Blockly.JavaScript.workspaceToCode(workspace);
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
        const templateData:FormApplication.Data<object> = {
            object: {},
            options: {} as any,
            title: 'Macronomicon',
        };
        return templateData;
    }

    _updateObject() {
        return;
    }
}

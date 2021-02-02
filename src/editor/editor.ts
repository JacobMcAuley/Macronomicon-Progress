import * as Blockly from 'blockly';
import { formatCode } from '../code-formatter';
import { createWorkspace } from '../workspace';

enum MacroEditorMode {
    Code = 'code',
    Blocks = 'blocks',
}

class UI {
    constructor(private html: JQuery | HTMLElement) {}
    get $buttons(): JQuery {
        return this.$sheet.find('[data-macronomicon-component="editor-mode-switch-button"]');
    }
    get $commandArea(): JQuery {
        return this.$sheet.find('.form-group.command');
    }
    get $modeSwitch(): JQuery {
        return this.$sheet.find('[data-macronomicon-component="editor-mode-switch"]');
    }
    get $sheet(): JQuery {
        const html$ = jQuery(this.html);
        return html$.is('.macro-sheet') ? html$ : html$.closest('.macro-sheet');
    }
    get $workspace(): JQuery {
        return this.$sheet.find('[data-macronomicon-component="workspace"]');
    }
    get $workspaceWrapper(): JQuery {
        return this.$sheet.find('[data-macronomicon-component="workspace-wrapper"]');
    }
}

const getReplaceableContent = (ui: UI) => {
    return ui.$commandArea.children().not(ui.$workspaceWrapper).not(ui.$modeSwitch);
};

const resizeObserver = new ResizeObserver((entries) => {
    const ui = new UI(entries[0].target as HTMLElement);
    const workspace = ui.$sheet.data('workspace');
    workspace && Blockly.svgResize(workspace);
});

const setMacroConfigMode = (mode: MacroEditorMode, ui: UI) => {
    ui.$sheet.attr('data-macronomicon-mode', mode);
    const $textarea = jQuery('.macro-sheet textarea[name="command"]');
    // Hide/Show the editors
    if (mode === MacroEditorMode.Code) {
        const workspace = ui.$sheet.data('workspace');
        // Dispose?
        getReplaceableContent(ui).show();
        ui.$workspaceWrapper.hide();
        const code = workspace ? Blockly.JavaScript.workspaceToCode(workspace) : '';
        if (code) {
            try {
                const codeFormatted = formatCode(code);
                $textarea.val(codeFormatted);
                $textarea.trigger('input');
            } catch (e: unknown) {
                $textarea.trigger('input');
            }
        }
        resizeObserver.disconnect();
    } else {
        getReplaceableContent(ui).hide();
        ui.$workspaceWrapper.show();
        if (ui.$workspace.children().length === 0) {
            const workspace = createWorkspace(ui.$workspace[0]);
            ui.$sheet.data('workspace', workspace);
        }
        resizeObserver.observe(ui.$sheet[0]);
    }
};

export const renderMacroConfig = async (_, html: JQuery) => {
    const ui = new UI(html);
    const buttonsHTML = await renderTemplate('modules/macronomicon/templates/buttons.html', {});
    const $buttons = jQuery(buttonsHTML);

    const blockEditorHTML = await renderTemplate('modules/macronomicon/templates/editor.html', {});
    const $blockEditor = jQuery(blockEditorHTML);

    ui.$commandArea.addClass('macronomicon-size-fix');
    const $commandLabel = ui.$commandArea.find('label:contains("Command")');
    $commandLabel.replaceWith($buttons);
    ui.$commandArea.append($blockEditor);

    ui.$buttons.on('click', (event) => {
        const action = jQuery(event.target).data('macronomicon-action');
        if (action) {
            setMacroConfigMode(action as MacroEditorMode, ui);
        }
    });

    setMacroConfigMode(MacroEditorMode.Code, ui);
};

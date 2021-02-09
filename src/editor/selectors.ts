// We use getters as the selectors aren't always available
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getFormSelectors = (html: HTMLElement) => {
    const $html = jQuery(html);
    const $sheet = $html.is('.macro-sheet') ? $html : $html.closest('.macro-sheet');
    return {
        get $buttons() {
            return $sheet.find('[data-macronomicon-component="editor-mode-switch"]');
        },
        get $commandArea() {
            return $sheet.find('.form-group.command');
        },
        get $modeSwitch() {
            return $sheet.find('[data-macronomicon-component="editor-mode-switch"]');
        },
        get $root() {
            return $sheet.find('[data-macronomicon-component="root"]');
        },
        get $sheet() {
            return $sheet;
        },
        get $workspace() {
            return $sheet.find('[data-macronomicon-component="workspace"]');
        },
        get $workspaceWrapper() {
            return $sheet.find('[data-macronomicon-component="workspace-wrapper"]');
        },
    };
};

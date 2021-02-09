import { MacroConfigSelectors } from './types';

export const renderBlockUI = async (selectors: MacroConfigSelectors): Promise<void> => {
    selectors.$commandArea.addClass('macronomicon-size-fix');
    // We use the "Command" label as an anchor as some modules (furnance) replace the textarea
    const $commandLabel = selectors.$commandArea.find('label:contains("Command")');
    $commandLabel.remove();
    selectors.$sheet.append(jQuery('<div data-macronomicon-component="root" style="display: none" />'));
};

export const getReplaceableContent = (selectors: MacroConfigSelectors): JQuery<HTMLElement> => {
    return selectors.$commandArea.children().not(selectors.$workspaceWrapper).not(selectors.$modeSwitch);
};

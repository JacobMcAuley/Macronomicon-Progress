import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { App } from './app';
import { getReplaceableContent, renderBlockUI } from './render-config';
import { getFormSelectors } from './selectors';

Hooks.on('renderMacroConfig', async (macroConfig: MacroConfig, html: HTMLElement) => {
    const selectors = getFormSelectors(html);
    await renderBlockUI(selectors);

    const codeEditor$ = getReplaceableContent(selectors);

    codeEditor$.detach();

    const appId = selectors.$sheet.attr('data-appid');

    if (appId) {
        render(
            <App appId={appId} codeEditor$={codeEditor$} config={macroConfig} portalContainer={selectors.$commandArea[0]} />,
            selectors.$root[0],
        );
    }
});

Hooks.on('closeMacroConfig', (_: MacroConfig, html: HTMLElement) => {
    const selectors = getFormSelectors(html);
    unmountComponentAtNode(selectors.$root[0]);
});
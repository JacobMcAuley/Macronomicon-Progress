import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { App } from './components/app';
import { loggers } from '../debug';
import { getReplaceableContent, renderBlockUI } from './render-config';
import { getFormSelectors } from './selectors';

const log = loggers.hooks;

Hooks.on('renderMacroConfig', (macroConfig: MacroConfig, html: HTMLElement) => {
    log('renderMacroConfig | %o', macroConfig);
    const selectors = getFormSelectors(html);
    renderBlockUI(selectors);

    const codeEditor$ = getReplaceableContent(selectors);
    codeEditor$.detach();

    const appId = selectors.$sheet.attr('data-appid');

    if (appId) {
        render(
            <App
                appId={appId}
                codeEditor$={codeEditor$}
                config={macroConfig}
                portalContainer={selectors.$commandArea[0]}
            />,
            selectors.$root[0],
        );
    }
});

Hooks.on('closeMacroConfig', (macroConfig: MacroConfig, html: HTMLElement) => {
    log('closeMacroConfig | %o', macroConfig);
    const selectors = getFormSelectors(html);
    unmountComponentAtNode(selectors.$root[0]);
});

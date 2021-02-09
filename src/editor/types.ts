import type { getFormSelectors } from './selectors';

export type MacroConfigSelectors = ReturnType<typeof getFormSelectors>;
export interface MacroRenderData {
    html: HTMLElement;
    macroConfig: MacroConfig;
}

import React, { FunctionComponent, useLayoutEffect, useRef } from 'react';

import { loggers } from '../../debug';

const log = loggers.components;
interface CodeEditorProps {
    code?: string;
    codeEditor$: JQuery<Element>;
    isLocked?: boolean;
    onEditorChange: () => void;
}

export const CodeEditor: FunctionComponent<CodeEditorProps> = ({
    code,
    codeEditor$,
    isLocked = false,
    onEditorChange,
}) => {
    log('CodeEditor:render | code: %s - isLocked: %o', code, isLocked);
    const wrapper = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        const editor$ = codeEditor$;
        log('CodeEditor:useLayoutEffect #1 | code: %s - isLocked: %o', code, isLocked, wrapper.current);
        if (wrapper.current) {
            const codeInput$ = codeEditor$.find('textarea[name="command"]');

            codeInput$.attr('readonly', isLocked ? 'readonly' : null);

            codeInput$.on('input', onEditorChange);

            if (isLocked) {
                codeInput$
                    .text(code ?? '')
                    .val(code ?? '')
                    .trigger('input')
                    .trigger('change');
            }

            codeEditor$.insertAfter(wrapper.current);
        }
        return () => {
            log('CodeEditor:useLayoutEffect #1 - removeHandler | editor: %o', editor$);
            editor$.detach();
        };
    }, [codeEditor$, code, isLocked, onEditorChange, wrapper]);
    return <div ref={wrapper} style={{ display: 'none' }}></div>;
};

import React, { FunctionComponent, useLayoutEffect, useRef } from 'react';

interface CodeEditorProps {
    code?: string;
    codeEditor$: JQuery<Element>;
    isLocked?: boolean;
    onEditorChange: () => void;
}

export const CodeEditor: FunctionComponent<CodeEditorProps> = ({ code, codeEditor$, isLocked = false, onEditorChange }) => {
    const wrapper = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(
        () => {
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
                codeEditor$.detach();
            };
        },
    );
    return <div ref={wrapper} style={{ display: 'none' }}></div>;
};

import javascript from 'prettier/parser-babel';
import prettier from 'prettier/standalone';

const plugins = [javascript];

export const formatCode = (code: string): string =>
    prettier.format(code,
                    {
                        parser: 'babel',
                        plugins,
                    }); 

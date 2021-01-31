import prettier from "prettier/standalone";
import javascript from 'prettier/parser-babel';

const plugins = [javascript];

export const formatCode = (code: string):string =>
    prettier.format(code, {
        parser: 'babel',
        plugins
    }); 
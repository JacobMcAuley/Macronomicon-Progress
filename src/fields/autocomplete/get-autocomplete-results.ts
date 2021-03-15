import { getObjTypes } from './get-obj-types';
import { ParsedPath, parsePath } from './parse-path';

export interface AutocompleteResults extends ParsedPath {
    results: [key: string, value: string][];
}

export const getAutocompleteResults = (input: string, data: Json): AutocompleteResults | null => {
    if (!input) {
        return null;
    }

    const parsed = parsePath(input);

    if (!parsed) {
        return null;
    }

    const searchObj = parsed.currentPath
        ? (getProperty(data, parsed.currentPath) as Record<string, unknown> | null | undefined)
        : data;

    if (!searchObj) {
        return null;
    }

    const results = Object.entries(getObjTypes(searchObj, (key) => key.startsWith(parsed.filter)) || {});

    if (!results.length) {
        return null;
    }

    return {
        ...parsed,
        results,
    };
};

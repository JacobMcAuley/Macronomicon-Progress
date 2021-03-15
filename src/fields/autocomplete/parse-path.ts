const PATH_MATCH_REGEX = /\s?@((?:[^.\s]+)(?:[.])?)*$/;
export interface ParsedPath {
    currentPath: string;
    filter: string;
}

export const parsePath = (input: string): ParsedPath | null => {
    if (!PATH_MATCH_REGEX.test(input)) {
        return null;
    }

    const matchedPath = /@(?<path>[^\s]*)$/.exec(input)?.groups?.path ?? null;

    if (matchedPath === null) {
        return null;
    }

    const [filter = '', ...currentPath] = matchedPath.split('.').reverse();

    return {
        currentPath: currentPath.reverse().join('.'),
        filter,
    };
};

import { ParsedPath, parsePath } from './parse-path';

describe('parse-path', () => {
    test('does not match non paths', () => {
        expect(parsePath('foo')).toEqual(null);
    });

    test('does match empty paths', () => {
        expect(parsePath('@')).toEqual({
            currentPath: '',
            filter: '',
        } as ParsedPath);

        expect(parsePath(' @')).toEqual({
            currentPath: '',
            filter: '',
        } as ParsedPath);
    });

    test('adds root filter', () => {
        expect(parsePath('@foo')).toEqual({
            currentPath: '',
            filter: 'foo',
        } as ParsedPath);
    });

    test('adds path filter', () => {
        expect(parsePath('@foo.bar')).toEqual({
            currentPath: 'foo',
            filter: 'bar',
        } as ParsedPath);
    });

    test('adds deeper path', () => {
        expect(parsePath('@foo.bar.baz')).toEqual({
            currentPath: 'foo.bar',
            filter: 'baz',
        } as ParsedPath);
    });

    test('handles a hanging dot', () => {
        expect(parsePath('@foo.')).toEqual({
            currentPath: 'foo',
            filter: '',
        } as ParsedPath);

        expect(parsePath('@foo.bar.')).toEqual({
            currentPath: 'foo.bar',
            filter: '',
        } as ParsedPath);
    });
});

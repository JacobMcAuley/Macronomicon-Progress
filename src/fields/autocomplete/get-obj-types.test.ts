import { getObjTypes, TypeDescriptors } from './get-obj-types';

describe('getObjTypes', () => {
    test('maps types correctly', () => {
        const input = {
            obj: {},
            string: 'string',
            nil: null,
            number: 3,
            undef: undefined,
            date: new Date(),
            bool: true,
            arr: [],
        };

        const expected = {
            obj: TypeDescriptors.Obj,
            string: TypeDescriptors.String,
            number: TypeDescriptors.Number,
            bool: TypeDescriptors.Boolean,
        };

        expect(getObjTypes(input)).toEqual(expected);
    });

    test('allows a filter', () => {
        const input = {
            foo: 'string',
            foobar: 'string',
            baz: {},
        };

        const expected = {
            foo: TypeDescriptors.String,
            foobar: TypeDescriptors.String,
        };

        expect(getObjTypes(input, (key) => key.startsWith('foo'))).toEqual(expected);
    });
});

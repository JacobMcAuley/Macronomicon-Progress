export enum TypeDescriptors {
    Obj = 'object',
    Number = 'number',
    String = 'string',
    Boolean = 'boolean',
}

const TypeDescriptorMaps = {
    '[object Object]': TypeDescriptors.Obj,
    '[object Number]': TypeDescriptors.Number,
    '[object String]': TypeDescriptors.String,
    '[object Boolean]': TypeDescriptors.Boolean,
};

const defaultFilter = <T extends Record<string, unknown>>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _key: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _value: T[keyof T],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _type: TypeDescriptors,
) => true;

export const getObjTypes = <T extends Record<string, unknown>>(o: T, filter = defaultFilter): Record<string, string> =>
    Object.getOwnPropertyNames(o)
        .filter((key) => Object.prototype.toString.call(o[key]) in TypeDescriptorMaps)
        .filter((key) =>
            filter<T>(
                key,
                o[key as keyof T],
                TypeDescriptorMaps[Object.prototype.toString.call(o[key]) as keyof typeof TypeDescriptorMaps],
            ),
        )
        .reduce((acc, key: keyof T) => ({ ...acc, [key]: typeof o[key] }), {});

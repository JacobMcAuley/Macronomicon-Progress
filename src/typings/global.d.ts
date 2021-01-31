declare module '*.css' {
    const Style: unknown;
    export = Style;
}

declare module '*.json' {
    const json: import('ts-toolbelt').Misc.JSON.Object;
    export = json;
}

declare type Json = import('ts-toolbelt').Misc.JSON.Object;

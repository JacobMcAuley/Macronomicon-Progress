declare interface MacroConfig extends EntitySheetConfig<unknown> {
    object: Macro;
}

declare interface Macro {
    getFlag: (scope: string, value: unknown) => string | null;
}

type Modify = SocketInterface.Requests.ModifyEmbeddedDocument;
declare namespace SocketInterface.Requests {
    interface ModifyEmbeddedDocument extends Modify {
        action: string;
        parentId?: string;
        parentType?: string;
    }
}

declare const _token: Token | undefined;

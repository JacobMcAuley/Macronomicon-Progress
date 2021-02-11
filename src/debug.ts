import debug from 'debug';

type LoggerNamespaces = 'hooks' | 'components';

type Loggers = Record<LoggerNamespaces, debug.Debugger['log']>;

const handler: ProxyHandler<Loggers> = {
    get: function (_, prop: keyof Loggers) {
        return debug(`macronomicon:${prop}`);
    },
};

export const loggers = new Proxy(({} as unknown) as Loggers, handler);

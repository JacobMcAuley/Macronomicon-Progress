import 'blockly';

type blocks = 'find_entity';

declare module 'blockly' {
    type BlocklyOptionsX = Omit<BlocklyOptions, 'toolbox'>;
    type GeneratorX = Generator;
    namespace Blockly {
        interface BlocklyOptions extends BlocklyOptionsX {
            toolbox?: Json;
        }
    }

    const JavaScript: Generator & {
        ORDER_NONE: number;
    } & {
            [_ in blocks]: (block: Blockly.Block) => string;
        };
}

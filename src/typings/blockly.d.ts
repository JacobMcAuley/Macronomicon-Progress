import 'blockly';

import { BlockNames } from '../blocks/block-definitions';

type blocks = BlockNames;

declare enum JavaScriptOrders {
    ORDER_ATOMIC = 0,
    ORDER_NEW = 1.1,
    ORDER_MEMBER = 1.2,
    ORDER_FUNCTION_CALL = 2,
    ORDER_INCREMENT = 3,
    ORDER_DECREMENT = 3,
    ORDER_BITWISE_NOT = 4.1,
    ORDER_UNARY_PLUS = 4.2,
    ORDER_UNARY_NEGATION = 4.3,
    ORDER_LOGICAL_NOT = 4.4,
    ORDER_TYPEOF = 4.5,
    ORDER_VOID = 4.6,
    ORDER_DELETE = 4.7,
    ORDER_AWAIT = 4.8,
    ORDER_EXPONENTIATION = 5.0,
    ORDER_MULTIPLICATION = 5.1,
    ORDER_DIVISION = 5.2,
    ORDER_MODULUS = 5.3,
    ORDER_SUBTRACTION = 6.1,
    ORDER_ADDITION = 6.2,
    ORDER_BITWISE_SHIFT = 7,
    ORDER_RELATIONAL = 8,
    ORDER_IN = 8,
    ORDER_INSTANCEOF = 8,
    ORDER_EQUALITY = 9,
    ORDER_BITWISE_AND = 10,
    ORDER_BITWISE_XOR = 11,
    ORDER_BITWISE_OR = 12,
    ORDER_LOGICAL_AND = 13,
    ORDER_LOGICAL_OR = 14,
    ORDER_CONDITIONAL = 15,
    ORDER_ASSIGNMENT = 16,
    ORDER_YIELD = 17,
    ORDER_COMMA = 18,
    ORDER_NONE = 99,
}

declare module 'blockly' {
    type BlocklyOptionsX = Omit<BlocklyOptions, 'toolbox'>;
    type GeneratorX = Generator;
    namespace Blockly {
        interface BlocklyOptions extends BlocklyOptionsX {
            toolbox?: Json;
        }
    }

    namespace Events {
        class Change__Class {
            type: string;
            name: string;
        }

        class Create {
            name: string;
        }
    }

    interface Workspace {
        injectionDiv_: HTMLElement | null;
    }

    type Blocks = { [_ in blocks]: (block: Block) => string | [string, number] } &
        { [_ in keyof typeof JavaScriptOrders]: typeof JavaScriptOrders[_] };

    interface JavaScriptGenerator {
        workspaceToCode: (Workspace: Workspace) => string;
    }

    const JavaScript: Omit<Generator, 'workspaceToCode'> & Blocks & JavaScriptGenerator;
}

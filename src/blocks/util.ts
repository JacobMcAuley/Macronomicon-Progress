import Blockly from 'blockly';

import { BlockNames } from './block-definitions';
import { BlockDefinition, ValueBlockDefinition } from './types';

interface InitFunc {
    (this: Blockly.Block, block: Blockly.Block): void;
}

interface GeneratorFunc<D extends BlockDefinition> {
    (definition: D, block: Blockly.Block): D extends ValueBlockDefinition ? [string, number] : string;
}

interface DefineBlockOptions<N extends BlockNames, D extends BlockDefinition> {
    name: N;
    JSON: D;
    init?: InitFunc;
    generator: GeneratorFunc<D>;
}

export function defineBlock<N extends BlockNames, D extends BlockDefinition>({
    init,
    JSON,
    generator,
    name,
}: DefineBlockOptions<N, D>): void {
    Blockly.Blocks[name] = {
        init: function (this: Blockly.Block) {
            this.jsonInit({ ...JSON, type: name });
            init?.apply(this, [this]);
        },
    };
    Blockly.JavaScript[name] = (block) => generator(JSON, block);
}

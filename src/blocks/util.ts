import Blockly from 'blockly';

import { BlockColours, BlockNames, BlockTypeColourMap } from './block-definitions';
import { BlockDefinition, ValueBlockDefinition } from './types';

interface InitFunc {
    (this: Blockly.Block, block: Blockly.Block): void;
}

interface GeneratorFunc<D extends BlockDefinition> {
    (definition: D, block: Blockly.Block): D extends ValueBlockDefinition ? [string, number] : string;
}

interface ChangeHandler {
    (block: Blockly.Block, data: Blockly.Events.Abstract): void;
}

interface DefineBlockOptions<N extends BlockNames, D extends BlockDefinition> {
    name: N;
    JSON: D;
    init?: InitFunc;
    generator: GeneratorFunc<D>;
    onChange?: ChangeHandler;
}

const changeHandlerMap = new WeakMap<Object, ChangeHandler[]>();

export const addBlockChangeHandler = (block: Blockly.Block, handler: ChangeHandler) => {
    const changeHandlers = changeHandlerMap.get(block) || changeHandlerMap.set(block, []).get(block)!;
    changeHandlerMap.set(block, [...changeHandlers, handler]);
};

export const runBlockChangeHandlers = (
    block: Blockly.Block,
    data?: Blockly.Events.BlockChange | Blockly.Events.BlockMove,
) => {
    if (block.isDisposed() || !block.workspace) {
        changeHandlerMap.delete(block);
        return;
    }
    const changeHandlers = changeHandlerMap.get(block);
    changeHandlers?.forEach((handler) => handler(block, data ?? new Blockly.Events.BlockChange(block)));
};

export function defineBlock<N extends BlockNames, D extends BlockDefinition>({
    init,
    JSON,
    generator,
    name,
    onChange,
}: DefineBlockOptions<N, D>): void {
    Blockly.Blocks[name] = {
        init: function (this: Blockly.Block) {
            const outputType = (JSON as ValueBlockDefinition).output;
            const colour = outputType ? BlockTypeColourMap[outputType] : BlockColours.Default;
            const definition = { colour, ...JSON, type: name };
            this.jsonInit(definition);
            init?.apply(this, [this]);
            if (onChange) {
                addBlockChangeHandler(this, onChange);
            }
            this.setOnChange((data: Blockly.Events.Abstract) => {
                const blockEvent = data as Blockly.Events.BlockMove & Blockly.Events.BlockChange;
                if ([blockEvent.oldParentId, blockEvent.newParentId, blockEvent.blockId].includes(this.id)) {
                    runBlockChangeHandlers(this, data as Blockly.Events.BlockMove | Blockly.Events.BlockChange);
                }
            });

            setTimeout(() => runBlockChangeHandlers(this), 0);
        },
    };
    Blockly.JavaScript[name] = (block) => generator(JSON, block);
}

export function getInputBlock(block: Blockly.Block, name: string): Blockly.Block | undefined {
    const inputBlock = block.getInputTargetBlock(name);
    return inputBlock && !inputBlock.isInsertionMarker() && !inputBlock.isDisposed() ? inputBlock : undefined;
}

interface ContextBlock extends Blockly.Block {
    contextParentId: string;
}

export const isContextBlock = (block: Blockly.Block | ContextBlock): block is ContextBlock => {
    return block.type === BlockNames.EntityContextItem;
};

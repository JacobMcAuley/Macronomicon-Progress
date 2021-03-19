import Blockly from 'blockly';

export const CONTEXT_MUTATOR_NAME = 'CONTEXT_MUTATOR';

const contextMutatorMixinObj: Pick<Blockly.Block__Class, 'mutationToDom' | 'domToMutation'> &
    Record<string, unknown> = {
    domToMutation(this: Blockly.Block, element: Element | null | undefined) {
        if (!element) {
            throw new Error('Missing mutation data');
        }
        const contextParentId = element?.getAttribute('context-parent-id');
        this.contextParentId = contextParentId;
        if (contextParentId && this.workspace?.getBlockById(contextParentId)) {
            const contextParentBlock = this.workspace.getBlockById(contextParentId);
            contextParentBlock.onchange(new Blockly.Events.BlockChange(contextParentBlock));
        }
    },
    mutationToDom(this: Blockly.Block) {
        const container = document.createElement('mutation');
        if (this.contextParentId) {
            container.setAttribute('context-parent-id', this.contextParentId);
        }
        return container;
    },
};

Blockly.Extensions.registerMutator(CONTEXT_MUTATOR_NAME, contextMutatorMixinObj /*, contextMutationHelper*/);

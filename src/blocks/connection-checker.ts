import * as Blockly from 'blockly/core';

import { isContextBlock } from './util';

export class StrictConnectionChecker extends Blockly.ConnectionChecker implements Blockly.IConnectionChecker {
    constructor() {
        super();
    }

    doTypeChecks(a: Blockly.Connection, b: Blockly.Connection): boolean {
        const checkArrayOne = a.getCheck();
        const checkArrayTwo = b.getCheck();

        const aBlock = a.getSourceBlock();
        const bBlock = b.getSourceBlock();

        if (isContextBlock(aBlock)) {
            const contextParent = aBlock.workspace.getBlockById(aBlock.contextParentId);

            if (contextParent) {
                const isContextChild = contextParent
                    .getInputTargetBlock('LOOP_BLOCK')
                    ?.getDescendants(false)
                    ?.some(({ id }) => id === bBlock.id);
                if (!isContextChild) {
                    return false;
                }
            }
        }

        if (checkArrayOne === null || checkArrayTwo === null) {
            return true;
        }

        for (let i = 0; i < checkArrayOne.length; i++) {
            if (checkArrayTwo.indexOf(checkArrayOne[i]) != -1) {
                return true;
            }
        }

        return false;
    }
}

export const registrationType = Blockly.registry.Type.CONNECTION_CHECKER;
export const registrationName = 'StrictConnectionChecker';

// Register the checker so that it can be used by name.
Blockly.registry.register(registrationType, registrationName, StrictConnectionChecker);

export const pluginInfo = {
    [registrationType as number]: registrationName,
};

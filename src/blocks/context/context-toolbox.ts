import Blockly from 'blockly';

import { BlockNames } from '../block-definitions';

export const getContextToolboxContents = (workspace: Blockly.Workspace): Element[] => {
    const contextBlocks = workspace
        .getAllBlocks(true)
        .filter(({ type }) => [BlockNames.ForEach, BlockNames.EntityContext].includes(type as BlockNames));

    const contextItemBlocks = contextBlocks.map((contextBlock) => {
        const variableName = contextBlock.getFieldValue('ITEM_NAME');
        return Blockly.Xml.textToDom(
            `
              <block type="${BlockNames.EntityContextItem}">
                <mutation context-parent-id="${contextBlock.id}" />
                <field name="ITEM_NAME">${variableName}</field>
              </block>
            `.trim(),
        );
    });

    return contextItemBlocks ?? [];
};

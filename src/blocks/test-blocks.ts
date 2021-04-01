import { BlockNames } from './block-definitions';
import { defineBlock } from './util';

defineBlock({
    name: BlockNames.TestBlock,
    JSON: {
        args0: [
            {
                name: 'ROLL_FORMULA',
                text: '10',
                type: 'field_autocomplete_input',
            },
        ],
        colour: 200,
        inputsInline: true,
        message0: 'Roll %1',
    },
    generator: () => ``,
});


//canvas.lighting.updateAll(value => ({ hidden: !value.data.hidden }));
import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

defineBlock({
    name: BlockNames.ApplyHealing,
    JSON: {
        args0: [
            {
                check: 'Number',
                name: 'HEALING_AMOUNT',
                text: '10',
                type: 'field_input',
            },
        ],
        colour: 200,
        inputsInline: true,
        message0: 'Heal %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) => `{
            const { max, min, value } = getProperty(target.actor, 'data.data.attributes.hp') || {};
            const heal = Math.clamped(value + ${block.getFieldValue('HEALING_AMOUNT')}, min, max);
            await target.actor.update({['data.attributes.hp.value']: heal});
        }`,
});

defineBlock({
    name: BlockNames.ApplyDamage,
    JSON: {
        args0: [
            {
                check: 'Number',
                name: 'DAMAGE_AMOUNT',
                text: '10',
                type: 'field_input',
            },
        ],
        colour: 200,
        inputsInline: true,
        message0: 'Damage %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    // eslint-disable-next-line arrow-body-style
    generator: (_, block) => {
        return `{
            const { max, min, value } = getProperty(target.actor, 'data.data.attributes.hp') || {};
            const damage = Math.clamped(value - ${block.getFieldValue('DAMAGE_AMOUNT')}, min, max);
            await target.actor.update({['data.attributes.hp.value']: damage});
        }`;
    },
});

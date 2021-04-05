import Blockly from 'blockly';

import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

// TODO - Make this accept a value input...
// probably with a shadow field_input
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
            const heal = Math.clamped(value + ${block.getFieldValue('HEALING_AMOUNT') ?? 0}, min, max);
            await target.actor.update({['data.attributes.hp.value']: heal});
        }`,
});

// TODO - Make this accept a value input...
// probably with a shadow field_input
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
    generator: (_, block) => `{
            const { max, min, value } = getProperty(target.actor, 'data.data.attributes.hp') || {};
            const damage = Math.clamped(value - ${block.getFieldValue('DAMAGE_AMOUNT')}, min, max);
            await target.actor.update({['data.attributes.hp.value']: damage});
        }`,
});

interface StatusEffect {
    id: string;
    icon: string;
    label: string;
}

type FieldDropdownData = [options: Blockly.FieldDropdown.ImageProperties | string, id: string];

defineBlock({
    name: BlockNames.ToggleEffect,
    JSON: {
        args0: [
            {
                colour: 200,
                name: 'EFFECT_ICON',
                type: 'field_dropdown',
                get options() {
                    return (CONFIG.statusEffects as StatusEffect[]).map(({ id }): FieldDropdownData => [id, id]);
                },
            },
        ],
        colour: 200,
        inputsInline: true,
        message0: 'Toggle effect %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) => {
        const selectedFx = block.getFieldValue('EFFECT_ICON');
        const value = (CONFIG.statusEffects as StatusEffect[]).find(({ id }) => id === selectedFx);
        return `await target.toggleEffect(${JSON.stringify(value)});`;
    },
});

defineBlock({
    name: BlockNames.ToggleVisibility,
    JSON: {
        colour: 200,
        inputsInline: true,
        message0: 'Toggle visibility',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: () => `await target.toggleVisibility();`,
});

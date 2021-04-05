import Blockly from 'blockly';

import { BlockNames, BlockTypes } from './block-definitions';
import { defineBlock } from './util';

function L() {
    const arr: string[][] = Object.entries(CONFIG.Canvas.lightAnimations).map(([k, v]) => [k, k]);
    arr.push(['None', '']);
    return arr;
}

/*
    Placeables
*/
defineBlock({
    generator: () => ['canvas.lighting.placeables', Blockly.JavaScript.ORDER_NONE],
    name: BlockNames.SceneLights,
    JSON: {
        colour: 100,
        message0: 'scene lights',
        output: [BlockTypes.Collection, BlockTypes.LightUpdate],
        tooltip: 'Gets all lights within the scene',
    },
});

/*
    Update Placeables
*/
defineBlock({
    name: BlockNames.UpdateLight,
    JSON: {
        args0: [
            {
                name: 'TOGGLE_TYPE',
                options: [
                    ['Off', 'true'],
                    ['On', 'false'],
                    ['Toggle', '!target.data.hidden'],
                ],
                type: 'field_dropdown',
            },
        ],
        colour: 70,
        message0: 'Update light to %1',
        previousStatement: BlockTypes.LightUpdate,
        nextStatement: BlockTypes.LightUpdate,
    },
    generator: (_, block) => `await target.update({ hidden : ${block.getFieldValue('TOGGLE_TYPE')} });`,
});

defineBlock({
    name: BlockNames.UpdateLightAnimation,
    JSON: {
        args0: [
            {
                name: 'TOGGLE_TYPE',
                options: L(),
                type: 'field_dropdown',
            },
        ],
        colour: 70,
        message0: 'Update light to %1',
        previousStatement: [BlockTypes.ActorUpdate, BlockTypes.LightUpdate],
        nextStatement: [BlockTypes.ActorUpdate, BlockTypes.LightUpdate],
    },
    generator: (_, block) =>
        `await target.update({ "lightAnimation.type" : "${block.getFieldValue('TOGGLE_TYPE')}" });`,
});

defineBlock({
    name: BlockNames.UpdateLightColor,
    JSON: {
        args0: [
            {
                name: 'TINT_COLOR',
                text: '#ff0000',
                type: 'field_colour',
            },
        ],
        colour: 70,
        message0: 'Update light to color %1',
        previousStatement: [BlockTypes.ActorUpdate, BlockTypes.LightUpdate],
        nextStatement: [BlockTypes.ActorUpdate, BlockTypes.LightUpdate],
    },
    generator: (_, block) => `await target.update({ tintColor : "${block.getFieldValue('TINT_COLOR')}" });`,
});

defineBlock({
    name: BlockNames.UpdateLightFOV,
    JSON: {
        args0: [
            {
                name: 'FIELD_ANGLE',
                angle: 90,
                type: 'field_angle',
            },
        ],
        colour: 70,
        message0: 'Update FOV to %1',
        previousStatement: [BlockTypes.ActorUpdate, BlockTypes.LightUpdate],
        nextStatement: [BlockTypes.ActorUpdate, BlockTypes.LightUpdate],
    },
    //tintColor : "#f51414"
    generator: (_, block) => {
        const angleShift = 0;
        const result = Number(block.getFieldValue('FIELD_ANGLE')) + angleShift;
        return `await target.update({ angle : ${result} });`;
    },
});

defineBlock({
    name: BlockNames.UpdateLightRotation,
    JSON: {
        args0: [
            {
                name: 'FIELD_ANGLE',
                angle: 90,
                type: 'field_angle',
            },
        ],
        colour: 70,
        message0: 'Update Rotation to %1',
        previousStatement: [BlockTypes.ActorUpdate, BlockTypes.LightUpdate],
        nextStatement: [BlockTypes.ActorUpdate, BlockTypes.LightUpdate],
    },
    //tintColor : "#f51414"
    generator: (_, block) => {
        const angleShift = 0;
        const result = Number(block.getFieldValue('FIELD_ANGLE')) + angleShift;
        return `await target.update({ rotation : ${result} });`;
    },
});

/*
    Update Scene
*/

defineBlock({
    name: BlockNames.UpdateDarkness,
    JSON: {
        args0: [
            {
                name: 'DARKNESS_LEVEL',
                value: 0,
                min: 0,
                max: 1,
                type: 'field_number',
            },
            {
                name: 'ANIMATION_STATUS',
                options: [
                    ['with', 'true'],
                    ['without', 'false'],
                ],
                type: 'field_dropdown',
            },
        ],
        colour: 70,
        message0: 'Set Darkness to %1 %2 transition',
        previousStatement: BlockTypes.LightUpdate,
        tooltip:
            'Sets the darkness level of the current scene to no darkness(0) or complete darkness(1) with optional animation',
        nextStatement: BlockTypes.LightUpdate,
    },
    generator: (_, block) =>
        `await canvas.scene.update({ darkness: ${block.getFieldValue(
            'DARKNESS_LEVEL',
        )} }, { animateDarkness: ${block.getFieldValue('ANIMATION_STATUS')} });`,
});

/*
angle: 180
bright: 12.62
darknessThreshold: 0
dim: 25.25
lightAnimation.intensity: 5
lightAnimation.speed: 5
lightAnimation.type: ""
rotation: 179
t: "l"
tintAlpha: 0.49
tintColor: "#e4ff14"
x: 2350
y: 1700
*/

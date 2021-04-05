import { BlockNames, BlockTypes } from '../block-definitions';
import { defineBlock } from '../util';

function T_Update(key: string, value: string | number) {
    return `await target.update({ ${key} : ${value} });`;
}

defineBlock({
    name: BlockNames.UpdateTokenSightLight,
    JSON: {
        args0: [
            {
                name: 'DIM_OR_BRIGHT',
                options: [
                    ['dim', 'dim'],
                    ['bright', 'bright'],
                ],
                type: 'field_dropdown',
            },
            {
                name: 'SIGHT_OR_LIGHT',
                options: [
                    ['sight', 'Sight'],
                    ['light', 'Light'],
                ],
                type: 'field_dropdown',
            },
            {
                name: 'RANGE',
                type: 'field_number',
                value: 0,
            },
        ],
        colour: 70,
        message0: 'Update token %1 %2 to %3 units',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) =>
        T_Update(
            `${block.getFieldValue('DIM_OR_BRIGHT')}${block.getFieldValue('SIGHT_OR_LIGHT')}`,
            block.getFieldValue('RANGE'),
        ),
});

defineBlock({
    name: BlockNames.UpdateTokenLightColor,
    JSON: {
        args0: [
            {
                name: 'LIGHT_COLOUR',
                colour: '#000000',
                type: 'field_colour',
            },
        ],
        colour: 70,
        message0: 'Update token light color to %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) => T_Update('lightColor', `'${block.getFieldValue('LIGHT_COLOUR')}'`),
});

defineBlock({
    name: BlockNames.UpdateTokenSightAngle,
    JSON: {
        args0: [
            {
                name: 'SIGHT_ANGLE',
                angle: 0,
                type: 'field_angle',
            },
        ],
        colour: 70,
        message0: 'Update token sight angle to %1',
        previousStatement: BlockTypes.ActorUpdate,
        nextStatement: BlockTypes.ActorUpdate,
    },
    generator: (_, block) => T_Update('sightAngle', block.getFieldValue('SIGHT_ANGLE')),
});

/*

 *   name: "Token Name",
 *   x: 1000,
 *   y: 1000,
 *   displayName: 3,
 *   img: "path/to/token-artwork.png",
 *   width: 2,
 *   height: 2,
 *   scale: 1.2,
 *   elevation: 50,
 *   lockRotation: false,
 *   rotation: 30,
 *   effects: ["icons/stun.png"],
 *   overlayEffect: "icons/dead.png",
 *   vision: true,
 *   dimSight: 60,
 *   brightSight: 0,
 *   dimLight: 40,
 *   brightLight: 20,
 *   sightAngle: 60,
 *   hidden: false,
 *   actorId: "dfgkjt43jkvdfkj34t",
 *   actorLink: true,
 *   actorData: {},
 *   disposition: 1,
 *   displayBars: 3,
 *   bar1: {attribute: "attributes.hp"},
 *   bar2: {attribute: "attributes.sp"}
*/

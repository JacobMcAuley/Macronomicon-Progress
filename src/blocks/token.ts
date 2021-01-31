// import * as Blockly from 'blockly';

// Blockly.Blocks['find_token'] = {
//     init: function (this: Blockly.Block) {
//         this.setInputsInline(false);
//         this.appendDummyInput().appendField('Find token');
//         this.appendValueInput('TOKEN_FILTER').setCheck('foo').appendField('filter: ').setAlign(Blockly.ALIGN_RIGHT);
//         this.setNextStatement(true);
//         this.setColour(140);
//     },
// };

// Blockly.JavaScript['find_token'] = function (block) {
//     const filter = Blockly.JavaScript.valueToCode(block, 'TOKEN_FILTER', Blockly.JavaScript.ORDER_NONE);
//     return `${filter}`;
// };

// Blockly.Blocks['selected_token'] = {
//     init: function (this: Blockly.Block) {
//         this.setInputsInline(false);
//         this.appendDummyInput().appendField('selected token');
//         this.setOutput(true, 'foo');
//         this.setColour(120);
//     },
// };

// Blockly.JavaScript['selected_token'] = () => [
//     `(({ data }) => (data._id ==== Object.values(canvas.tokens._controlled)[0]))`,
//     Blockly.JavaScript.ORDER_NONE,
// ];

// Blockly.Blocks['by_name'] = {
//     init: function (this: Blockly.Block) {
//         this.setInputsInline(false);
//         this.appendValueInput('NAME_INPUT')
//             .setCheck('String')
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(new Blockly.FieldLabelSerializable('with name: '), 'NAME_INPUT');

//         this.setOutput(true, 'foo');
//         this.setColour(100);
//     },
// };

// Blockly.JavaScript['by_name'] = (block) => {
//     const name = Blockly.JavaScript.valueToCode(block, 'NAME_INPUT', Blockly.JavaScript.ORDER_NONE);
//     return [`(({ data }) => (data.name === ${name}))`, Blockly.JavaScript.ORDER_NONE];
// };

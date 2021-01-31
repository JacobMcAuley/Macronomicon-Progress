import * as Blockly from 'blockly';

Blockly.Blocks['say_aloud'] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendValueInput('CHAT_MESSAGE_VALUE')
            .appendField('Say message')
            .appendField(
                new Blockly.FieldTextInput('my message'),
                'CHAT_MESSAGE_INPUT',
            )
            .appendField('aloud')
            .setCheck('String');

        this.setColour(160);
        this.setTooltip('Says a message aloud');
        this.setHelpUrl('')

        this.setNextStatement(true, 'Entity');
    },
};


Blockly.JavaScript['say_aloud'] = function(block) {
  const msg = block.getFieldValue('CHAT_MESSAGE_INPUT');

  return `
  ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({token: canvas.tokens.controlled[0]}),
      content: "${msg}"
  }, {chatBubble : true})`;
}
module.exports = {
	name: 'fruits',
	description: 'Reacts to your message with fruits',
	execute(message, args) {
		message.react('🍎');
        message.react('🍊');
        message.react('🍇');
	},
};
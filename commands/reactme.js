module.exports = {
	name: 'reactme',
	description: 'Reacts to your message with your specified emoji',
	execute(message, args) {
		message.react('🍎');
        message.react('🍊');
        message.react('🍇');
	},
};
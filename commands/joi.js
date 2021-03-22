module.exports = {
	name: 'joi',
	description: 'Reacts to your message with :joi:',
	execute(message, args) {

        if (message.author.id === '712492815824977942') {
            
            message.react('817282628377903107');
            return;
        }

        message.reply('You\'re not joi!')

	},
};
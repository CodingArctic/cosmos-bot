module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	cooldown:0,
	execute(message, args) {

		if (message.author.id === '160504751203549185') {

			process.exit();

		}

        else {
			message.reply('Only my owner can run that commmand!');
		}

	}
};
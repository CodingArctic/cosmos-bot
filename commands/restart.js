module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	cooldown:0,
	execute(message, args) {

        message.reply('Restarting...');

		process.exit();
	}
};
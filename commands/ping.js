module.exports = {
	name: 'ping',
	description: 'Pong!',
	cooldown:5,
	execute(message) {
		message.channel.send('Pong!');
	},
};
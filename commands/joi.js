module.exports = {
	name: 'fruits',
	description: 'Reacts to your message with :joi:',
	execute(message, args) {
		message.react(client.emojis.get("823310453333033060"));
	},
};
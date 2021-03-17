const { SystemChannelFlags } = require("discord.js");

module.exports = {
	name: 'reactme',
	description: 'Reacts to your message with your specified emojis',
	execute(message, args) {
		
		var i = 0;

		for (i = 0; i < 21;) {

			var emoji = (args[i]);

			console.log(`Looks like the emoji is ${emoji}`);

			if (emoji === "undefined") {
				console.log('emoji detected blank');
				break;
			}

			console.log(`Looks like the emoji is ${emoji}`);

			message.react(emoji);

			console.log(`Looks like the emoji is ${emoji}`);
			console.log('Here');

			i++;

			console.log(`Looks like the emoji is ${emoji}`);

		}

		console.log('made it out');
	},
};
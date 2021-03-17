const { SystemChannelFlags } = require("discord.js");

module.exports = {
	name: 'reactme',
	description: 'Reacts to your message with your specified emoji',
	execute(message, args) {

		var emoji = (args[0]);

		if (emoji == "undefined") {
			message.reply('Please specify an emoji!')
		}

		else if ((args[1]) !== "undefined") {
			console.log(args[1]);
			message.reply('I can only react with 1 emoji!');
		}

		else {
		
		message.react(emoji);

		}

	},
};
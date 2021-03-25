const { SystemChannelFlags } = require("discord.js");

module.exports = {
	name: 'echo',
	description: 'echo!',
	execute(message, args) {

        let msg = args[0];

        for(let i = 1; i < args.length; i++)
        {
            msg += " " + args[i];
        }

        if (message.author.id === '160504751203549185' && msg !== "undefined") {

        message.delete();
		
		message.channel.send(msg);

        }

        else {

            message.delete();

            return;
        }

	},
};
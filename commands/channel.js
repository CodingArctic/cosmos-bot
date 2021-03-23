const { GuildChannelManager, Guild } = require("discord.js");
const { guildOnly } = require("./server");

module.exports = {
	name: 'channel',
	description: 'Makes a channel with specified name',
    cooldown: 5,
    guildOnly: true,
	execute(message, args) {

        const member = message.guild.member(message.author);

        if (message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) {

        const name = (args[0]);

        message.reply('Channel created.');

        message.guild.channels.create(name);

        }
        
        else {
            message.reply('You need the Manage Channels permission to do that!');
        }


	},
};
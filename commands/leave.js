const { VoiceChannel } = require("discord.js");
const { Client } = require("discord.js");

module.exports = {
	name: 'leave',
	description: 'Makes bot leave voice channel',
	cooldown:5,
    guildOnly: true,
	execute(message, args) {
		
        const { voice } = message.member.voice.channel

        if (!voice.channelID) {
            message.reply('You must be in a voice channel to use this command!')
            return
        }

        voice.leave();



	},
};
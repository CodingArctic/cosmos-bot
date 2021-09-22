const { VoiceChannel } = require("discord.js");
const { client } = require("discord.js");
const { connect } = require("http2");
const path = require('path');

module.exports = {
	name: 'lesgoo',
	description: 'Plays DaBaby les goo',
	cooldown:5,
    guildOnly: true,
	execute(message, args) {
		
        const { voice } = message.member

        if (!voice.channelID && !args[0]) {
            message.reply('You must be in a voice channel to use this command!')
            return
        }

        if (voice.channelID){
        
        voice.channel.join().then((connection) => {

            connection.play('audio/lesgoo.mp3');

        })
    }

    else if (args[0]) {

        let channel = message.guild.channels.cache.get(args[0]);

        channel.join().then((connection) => {

            connection.play('audio/lesgoo.mp3');

        })

    }



	},
};
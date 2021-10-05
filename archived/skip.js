const { VoiceChannel, SystemChannelFlags } = require("discord.js");
const { client } = require("discord.js");
const { connect } = require("http2");
const path = require('path');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { Console } = require('console');

const queue = new Map();



module.exports = {
	name: 'play',
	description: 'Plays YouTube audio',
	cooldown:5,
    aliases: ['skip', 'stop'],
    guildOnly: true,
	async execute(message, server_queue) {
        
        
}

}
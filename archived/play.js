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
	async execute(message, args, cmd, client, Discord, prefix) {


        const prefix = '-';

        console.log(prefix);
        console.log(message.content);

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();


        console.log('play command run');
        console.log(commandName);

        const voice_channel = message.member.voice.channel;

        if (!voice_channel) return message.reply('You need to be in a channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.reply('You don\'t have the correct permissions!');
        if (!permissions.has('SPEAK')) return message.reply('You don\'t have the correct permissions!');

        const server_queue = queue.get(message.guild.id);


            if (!args.length) return message.reply('You need to specify a song to play!');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                console.log('link validated');
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                // Argument isn't a URL, we search with keywords
                console.log('link not validated, using keywords');
                const video_finder = async (query) =>{
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length >1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                    message.replay('Error finding video.');
                }
            }

            if(!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
    
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`**${song.title}** added to queue!`)
            }
    
        
        }

        
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`Now playing **${song.title}**!`)
}
const { VoiceChannel } = require("discord.js");
const { client } = require("discord.js");
const { connect } = require("http2");
const path = require('path');
// const { ytdl } = require("ytdl");

module.exports = {
	name: 'play',
	description: 'Plays YouTube audio',
	cooldown:5,
    guildOnly: true,
	execute(message, args) {

        const { voice } = message.member

        var url = args[0];

        voice.channel.join()
        .then(connection => {
            console.log('joined channel');
        
            connection.playStream(ytdl(url))
            // When no packets left to send, leave the channel.
            .on('end', () => {
                console.log('left channel');
                connection.channel.leave();
            })
            // Handle error without crashing the app.
            .catch(console.error);
        })
        .catch(console.error);


// stream.pipe(fs.createWriteStream('tmp_buf_audio.mp3'))
// .on('end', () => {
//     message.member.voiceChannel.join()
//     .then(connection => {
//         console.log('joined channel');

//         connection.playStream(fs.createReadStream('tmp_buf_audio.mp3'))
//         // When no packets left to send, leave the channel.
//         .on('end', () => {
//             console.log('left channel');
//             connection.channel.leave();
//         })
//         // Handle error without crashing the app.
//         .catch(console.error);
//     })
//     .catch(console.error);
// });
    }
}
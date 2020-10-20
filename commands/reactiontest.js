const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

module.exports = {
	name: 'reactiontest',
	description: 'Testing Reactions',
	execute(message, args) {
        message.channel.bulkDelete(1, true);
        
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Ticket Test')
        .setAuthor('Snowy Bot', 'https://i.imgur.com/pV3sJFL.jpg')
        .addField('React below to open a ticket!')

        message.channel.send(helpEmbed).then(sentEmbed => {

            sentEmbed.react('🎟️');
            
            client.on('messageReactionAdd', async (reaction, user) => {
                // When we receive a reaction we check if the reaction is partial or not
                if (reaction.partial) {
                    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
                    try {
                        await reaction.fetch();
                    } catch (error) {
                        console.error('Something went wrong when fetching the message: ', error);
                        // Return as `reaction.message.author` may be undefined/null
                        return;
                    }
                }
                // Now the message has been cached and is fully available
                console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
                // The reaction is now also fully available and the properties will be reflected accurately:
                console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
            });

        })

	},
};
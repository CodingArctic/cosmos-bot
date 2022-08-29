const Discord = require('discord.js');

module.exports = {
	name: 'poll',
	description: 'Sets up a poll with your specified question!',
	execute(message, args) {

        message.channel.bulkDelete(1);


        let question = args[0];

        if (!question) {
            message.reply('Please specify a question!')
            .then(message => message.delete({timeout: 3000}))
            return
        }
 
        for(let i = 1; i < args.length; i++)
        {
            question += " " + args[i];
        }

        const pollEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Cosmos Bot', 'https://i.imgur.com/yab6QxW.jpg')
        .setTitle('Poll')
        .setDescription(question)
        .setFooter('Requested by ' + message.author.tag, message.author.avatarURL())

        message.channel.send(pollEmbed).then(sentEmbed => {

            sentEmbed.react('✅');
            
            sentEmbed.react('❌');

        })


	},
};
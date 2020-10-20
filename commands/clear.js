const Discord = require('discord.js');


module.exports = {
	name: 'clear',
    description: 'Deletes a specified amount of messages.',
    cooldown: 5,
	execute(message, args) {

        if (message.member.hasPermission('MANAGE_MESSAGES')) {

        const amount = parseInt(args[0]) + 1;
        
        if (isNaN(amount)) {
            return message.reply('That doesn\'t seem to be a valid number.');
        }

     else if (amount < 1 || amount > 100) {
        return message.reply('Please input a number between 1 and 100.');
    }


    message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send('There was an error trying to prune messages in this channel!');
    });

        }

        else {

            message.channel.bulkDelete(1);

            message.reply('You need the Manage Messages permission to do that!');
        }


	},
};
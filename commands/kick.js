const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'Kicks the mentioned account',
	cooldown:5,
	execute(message, args) {

        if(!message.member.hasPermission("KICK_MEMBERS")) {
            message.reply('You don\'t have permission to do that!')
          }
          
          if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            message.reply('I do not have enough permission to use this command!')
          }
          
          const target = message.mentions.members.first();
          
          if(!target) {
            return message.reply(`Please mention the person you want to kick`)
          }
          
          if(target.id === message.author.id) {
           return message.reply(`why would you even try that`)
          }
          
        if(!args[1]) {
          return message.reply(`Please give a reason to kick`)
        }
          
          const embed = new Discord.MessageEmbed()
          .setTitle("Action: Kick")
          .setDescription(`Kicked ${target} (${target.id})`)
          .setColor("#ff2050")
          .setFooter(`Kicked by ${message.author.username}`);
          
          message.channel.send(embed);
          
          target.kick(args[1]);

}

}
const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'Kicks the mentioned account',
	cooldown:5,
  guildOnly: true,
	execute(message, args) {

        if(!message.member.hasPermission("KICK_MEMBERS")) {
            message.reply('You don\'t have permission to do that!')
            return;
          }
          
          if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            message.reply('I do not have enough permission to use this command!')
            return;
          }
          
          const target = message.mentions.members.first();
          
          if(!target) {
            message.reply(`Please mention the person you want to kick`)
            return;
          }
          
          if(target.id === message.author.id || target.id === '160504751203549185' || target.id === '629068098896527378') {
           message.reply(`Why would you even try that`)
           return;
          }
          
        if(!args[1]) {
          message.reply(`Please give a reason to kick`)
          return;
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
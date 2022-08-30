const Discord = require('discord.js');
module.exports = {
	name: 'ban',
	description: 'Bans the mentioned account',
	cooldown:5,
  guildOnly: true,
	execute(message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) {
            message.reply('You don\'t have permission to do that!')
            return;
          }
          
          if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            message.reply('I do not have enough permission to use this command!')
            return;
          }
          
          const target = message.mentions.members.first();
          
          if(!target) {
            return message.reply(`Please mention the person you want to ban`)
          }
          
          if(target.id === message.author.id || target.id === '160504751203549185' || target.id === '629068098896527378') {
           return message.reply(`Why would you even try that?`)
          }
          
          
        if(!args[1]) {
          return message.reply(`Please give a reason to ban`)
        }
          
          const embed = new Discord.MessageEmbed()
          .setTitle("Action: Ban")
          .setDescription(`Banned ${target} (${target.id})`)
          .setColor("#ff2050")
          .setFooter(`Banned by ${message.author.username}`);
          
          message.channel.send(embed);
          
          target.ban(args[1]);

}

}
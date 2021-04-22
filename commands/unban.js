const Discord = require('discord.js');
module.exports = {
	name: 'unban',
	description: 'Unbans the mentioned account',
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
            return message.reply(`Please mention the person you want to unban`)
          }
          
          if(target.id === message.author.id) {
           return message.reply(`uhhhhhh`)
          }
          
          const embed = new Discord.MessageEmbed()
          .setTitle("Action: Unban")
          .setDescription(`Unbanned ${target} (${target.id})`)
          .setColor("#ff2050")
          .setFooter(`Unbanned by ${message.author.username}`);
          
          message.channel.send(embed);
          
          target.unban(target,args[1]);

}

}
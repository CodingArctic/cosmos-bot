const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const { token } = require('./token.json')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        status: "online",  //You can show online, idle....
        activity: {
            name: "Montero | -help",  //The message shown
            type: "LISTENING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
 });


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}

	 catch (error) {

		let arctic = message.guild.members.cache.get('160504751203549185');

		console.error(error);

		if (arctic) {

		arctic.send(`something went wrong in "${message.guild.name}", here are the details:\n` + error).then(() => {

			return message.reply('There was an error when executing that command, my dev has been notified.');

		}).catch(() => {

			return message.reply('There was an error when executing that command, and for some reason I can\'t send a dm to my dev.')

		})
	}
	
	else {
		return message.reply('There was an error when executing that command, and I can\'t send a dm to my dev because he\'s not in this server.')
	}



		
	}
});


client.login(token);
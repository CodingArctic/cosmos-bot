const { prefix, token } = require('./config.json');

module.exports = {
	name: 'prefix',
	description: 'DOES NOT WORK',
	cooldown:5,
	execute(message, args) {

        const newPrefix = parseString(args[0]);

		prefix = newPrefix;
	},
};
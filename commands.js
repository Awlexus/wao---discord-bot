import utils from './Utils';

const thisers = [];

export const commands = [
	[msg => utils.containsCommand(msg, 'ping'), msg => msg.reply('pong')],
	[msg => utils.containsCommand(msg, 'shrug'), msg => msg.reply('¯\\_(ツ)_/¯')],
	[msg => utils.containsCommand(msg, 'mention'), msg => {
		const mentions = msg.mentions.members
		if (mentions.size > 0)
			msg.channel.send(`Mentioned people ${mentions.array()}`)
		else
			msg.channel.send('You mentioned nobody')
	}],
	[msg => utils.containsCommand(msg, 'thiser'), msg => {
		const members = msg.mentions.members
		if (members.size > 0) {
			const member = members.first()
			thisers.push(member)
			msg.channel.send(`${member.user.username} is now able to ^`)
		} else {
			thisers.push(msg.author)
			msg.reply('You are now a thiser')
		}
	}],
	[msg => utils.messageWithPrefix(msg), msg => msg.reply('You called?')],
	[msg => utils.messageStartsWith(msg, '^'), msg => utils.agreed(msg)]
];
import utils from './Utils'
import DataBase from 'nedb'

const thisers = new DataBase({filename: '../db/thisers.db', autoload: true})

function findUser (db, user, callback) {
	db.findOne({uid: user.id}, (err, user) =>callback(user))
}

function insertUser (db, user, fields) {
	let doc = fields ? fields(user) : {}
	doc['uid'] = user.id

	db.insert(doc)
}


export const commands = [
	[msg => utils.fromBot(msg), msg => msg.channel.send('Ayy bitch, nobody allowed you to call me!')],
	[msg => utils.containsCommand(msg, 'ping'), msg => msg.channel.send('pong')],
	[msg => utils.containsCommand(msg, 'shrug'), msg => msg.channel.send('¯\\_(ツ)_/¯')],
	[msg => utils.containsCommand(msg, 'tag'), msg => msg.reply(`Your tag is ${msg.author.tag}`)],
	[msg => utils.containsCommand(msg, 'username'), msg => msg.reply(`Your username is ${msg.author.username}`)],
	[msg => utils.containsCommand(msg, 'displayName'), msg => msg.reply(`Your displayName is ${msg.author.displayName}`)],
	[msg => utils.containsCommand(msg, 'mention'), msg => {
		const mentions = msg.mentions.members
		if (mentions.size > 0)
			msg.channel.send(`Mentioned people ${mentions.array()}`)
		else
			msg.channel.send('You mentioned nobody')
	}],
	[msg => utils.containsCommand(msg, 'thiser'), msg => {
		if (msg.author.id !== '205980900247207936') {
			msg.reply('you are not my boss')
		}

		let users = msg.mentions.users

		const user = users.length ? users.first() : msg.author
		const isAuthor = msg.author === user

		let usertext = isAuthor ? 'Your are' : user.username + 'is'

		findUser(thisers, user, match => {
			if (match) {
				msg.channel.send(`${usertext} can already use ^`)
			} else {
				insertUser(thisers, user)
				msg.channel.send(`${usertext} can now use ^`)
			}
		})

	}],
	[msg => utils.messageWithPrefix(msg) && !utils.afterPrefix(msg), msg => msg.reply('You called?')],
	[msg => utils.messageStartsWith(msg, '^'), msg => {
		findUser(thisers, msg.author, match => {
			if (match)
				utils.agreed(msg)
		})
	}]
]
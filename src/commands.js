import utils from './Utils'
import Firebase from 'firebase'


function findUser (user, callback) {
	Firebase.database().ref('users').child(user.id).once('value').then(snapshot => {
		callback(snapshot.val())
	})
}

function insertPermission (user, name, callback) {
	Firebase.database().ref('users/').child(user.id).child(name).set(true).then(err => callback(err))
}


export const commands = [
	[msg => utils.fromBot(msg), msg => msg.channel.send('Ayy bitch, nobody allowed you to call me!')],
	[msg => utils.containsCommand(msg, 'ping'), msg => msg.channel.send('pong')],
	[msg => utils.containsCommand(msg, 'shrug'), msg => msg.channel.send('¯\\_(ツ)_/¯')],
	[msg => utils.containsCommand(msg, 'wafucry'), msg => utils.wafucry(msg)],
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
		const user = users.size ? users.first() : msg.author
		const isAuthor = msg.author === user

		let username = isAuthor ? 'You' : user.username

		findUser(user, match => {
			if (match) {
				msg.channel.send(`${username} can already use ^`)
			} else {
				insertPermission(user, 'thiser', err => {
					if (err) {
						console.log(err)
						msg.channel.send('something went wrong ;_;')
					}
				})
				msg.channel.send(`${username} can now use ^`)
			}
		})

	}],
	[msg => utils.messageWithPrefix(msg) && !utils.afterPrefix(msg), msg => msg.reply('You called?')],

	[msg => utils.messageStartsWith(msg, '^'), msg => {
		utils.agreed(msg)
	}]
]
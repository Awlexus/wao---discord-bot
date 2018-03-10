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
	[msg => utils.hasThisImage(msg), msg => msg.reply('please stop using this image. I have a command for this. Just type ^ and I\'ll do it for you.\nPlease stop wasting your own bandwidth')],
	[msg => utils.fromBot(msg), msg => msg.channel.send('Ayy bitch, nobody allowed you to call me!')],
	[msg => utils.containsCommand(msg, 'ping'), msg => msg.channel.send('pong')],
	[msg => utils.containsCommand(msg, 'rei'), msg => msg.channel.send(utils.randomEmoticonWithTag(utils.afterCommand(msg, 'rei')))],
	[msg => utils.containsCommand(msg, 'shrug'), msg => msg.channel.send('¯\\_(ツ)_/¯')],
	[msg => utils.containsCommand(msg, 'wafucry'), msg => utils.wafucry(msg)],
	[msg => utils.containsCommand(msg, 'tag'), msg => msg.reply(`Your tag is ${msg.author.tag}`)],
	[msg => utils.containsCommand(msg, 'username'), msg => msg.reply(`Your username is ${msg.author.username}`)],
	[msg => utils.containsCommand(msg, 'displayName'), msg => msg.reply(`Your displayName is ${msg.author.displayName}`)],
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

	[msg => utils.messageStartsWith(msg, '^'), msg => utils.agreed(msg)
	]
]
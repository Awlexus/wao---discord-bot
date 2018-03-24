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

/**
 * Send the author of the message the help menu
 * @param msg
 */
function sendHelpMenu (msg) {
	msg.author.send(`All commands are case insensitive and you can even whitespaces between the prefix and the command
	\`\`\`${prefixed.map(item => `${item[3] ? "": process.env.BOT_PREFIX}${item[0]} - ${item[1]}`).join('\n')}
	\`\`\``)
}

function callCommand (msg) {
	let content = utils.afterPrefix(msg)
	if (!content) {
		msg.reply('soup')
	} else {
		const command = utils.splitOnFirstWord(content).toLowerCase()
		const match = prefixed.find(cmd => cmd[0] === command)

		if (match)
			match[2](msg)
	}
}

const prefixed = [
	['ping', 'pong', msg => msg.channel.send('pong')],
	['help', 'See the help menu', msg => sendHelpMenu(msg)],
	['rei', "Displays a random emoticon. If a tag is provided, it'll search for an fitting emoticon", msg => msg.channel.send(utils.randomEmoticonWithTag(utils.afterCommand(msg, 'rei')))],
	['shrug', '¯\\_(ツ)_/¯', msg => msg.channel.send('¯\\_(ツ)_/¯')],
	['wafucry', 'Makes Wafu cry', msg => utils.wafucry(msg)],
	['tag', 'tells you your tag', msg => msg.reply(`Your tag is ${msg.author.tag}`)],
	['username', 'tells you your username', msg => msg.reply(`Your username is ${msg.author.username}`)],
	['displayName', 'tells you your displayname', msg => msg.reply(`Your displayName is ${msg.author.displayName}`)],
	['^', 'Agrees with something', "", true],
]

export const commands = [
	[msg => utils.hasThisImage(msg), msg => msg.reply('please stop using this image. I have a command for this. Just type ^ and I\'ll do it for you.\nPlease stop wasting your own bandwidth')],
	[msg => utils.fromBot(msg), msg => msg.channel.send('Ayy bitch, nobody allowed you to call me!')],
	[msg => utils.messageWithPrefix(msg), msg => callCommand(msg)],
	[msg => utils.messageStartsWith(msg, '^'), msg => utils.agreed(msg)
	]
]

/* Keep this as reference
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
 */
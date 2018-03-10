const prefix = process.env.BOT_PREFIX

function isEmpty (str) {
	return (!str || 0 === str.length)
}

/**
 * Send a file with message to the given channel
 * @param channel
 * @param filenames
 * @param msg
 */
function sendFile (channel, filenames, msg) {
	msg = msg || ""
	const options = {
		files: filenames
	}

	channel.send(msg, options)
}

/**
 * Agree with the person
 * @param msg
 */
const agreed = msg => {
	sendFile(msg.channel, ['./assets/this.jpg'], msg.member.displayName + " agrees!")
	console.log('Agreed!')
}
const wafucry = msg => {
	sendFile(msg.channel, ['./assets/wafucry.gif'])
	console.log(`${msg.member.displayName} made Wafu cry in ${msg.channel}`)
}

const cistartsWith = (text, search) => text.toLowerCase().startsWith(search.toLowerCase())
const messageStartsWith = (msg, text) => cistartsWith(msg.content, text)
const messageWithPrefix = msg => messageStartsWith(msg, prefix)
const afterPrefix = msg => msg.content.substring(prefix.length).trim()
const containsCommand = (msg, text) => !msg.author.bot && messageWithPrefix(msg) && cistartsWith(afterPrefix(msg), text)
const fromBot = msg => msg.author.bot && messageWithPrefix(msg)

// const

export default {
	sendFile,
	agreed,
	wafucry,
	messageStartsWith,
	messageWithPrefix,
	afterPrefix,
	containsCommand,
	fromBot
}
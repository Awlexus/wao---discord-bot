import config from "./config"

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
	sendFile(msg.channel, ['./this.jpg'], msg.author.username + " agrees!")
	console.log('Agreed!')
}

const messageStartsWith = (msg, text) => msg.content.startsWith(text)
const messageWithPrefix = msg => messageStartsWith(msg, config.prefix)
const afterPrefix = msg => msg.content.substring(config.prefix.length).trim()
const containsCommand = (msg, text) => messageWithPrefix(msg) && afterPrefix(msg).startsWith(text) && !msg.author.bot

export default {
	sendFile,
	agreed,
	messageStartsWith,
	messageWithPrefix,
	afterPrefix,
	containsCommand
}
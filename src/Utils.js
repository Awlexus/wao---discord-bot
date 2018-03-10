import emoticon_data from 'emoticon-data/emoticons'
import custom_emoticons from '../custom_emojis'

const prefix = process.env.BOT_PREFIX
const emoticons = emoticon_data['emoticons'].concat(custom_emoticons)

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
function agreed (msg) {
	sendFile(msg.channel, ['./assets/this.jpg'], msg.member.displayName + " agrees!")
	console.log('Agreed!')
}

/**
 * Somebody made wafu cry!
 * @param msg
 */
function wafucry (msg) {
	sendFile(msg.channel, ['./assets/wafucry.gif'])
	console.log(`${msg.member.displayName} made Wafu cry in ${msg.channel}`)
}

function hasThisImage (msg) {
	return msg.attachments && !!msg.attachments.find(function (next) {
		return next.filename === 'jjba-stardust-crusaders-kakyoin-pose.jpg'
	})
}

function randomEmoticonWithTag (searchTag) {
	const rand = arr => arr[Math.floor(Math.random() * arr.length)]

	searchTag = searchTag.trim().toLowerCase()
	if (!searchTag)
		return rand(emoticons)
	const withTag = emoticons
		.filter(emoticon => emoticon['tags'].find(tag => tag.indexOf(searchTag) !== -1))
		.map(emoticon => emoticon['string'])
	return withTag.length !== 0 ? rand(withTag) : `No emoticon with the tag "${searchTag}" found`
}

/**
 * Case insensitive version of startsWith
 * @param text
 * @param search
 * @returns {boolean}
 */
const cistartsWith = (text, search) => text.toLowerCase().startsWith(search.toLowerCase())

/**
 * Checks whether the message starts with a certain text (case insensitive)
 * @param msg
 * @param text
 * @returns {boolean}
 */
const messageStartsWith = (msg, text) => cistartsWith(msg.content, text)

/**
 * Checks whether the message starts with the defined prefix (Case insensitive)
 * @param msg
 * @returns {*}
 */
const messageWithPrefix = msg => messageStartsWith(msg, prefix)

const trimmedOffset = (text, offset) => text.substring(isNaN(offset) ? offset.length : offset).trim()

/**
 * Returns the text after the prefix
 * @param msg
 * @returns {string}
 */
const afterPrefix = msg => trimmedOffset(msg.content, prefix)

const afterCommand = (msg, command) => trimmedOffset(afterPrefix(msg), command)

/**
 * Checks whether the starts with the prefix followed by the specified command (Case insensitive)
 * @param msg
 * @param text
 * @returns {boolean|*}
 */
const containsCommand = (msg, text) => !msg.author.bot && messageWithPrefix(msg) && cistartsWith(afterPrefix(msg), text)

/**
 * Checks if a bot tried to issue a command
 * @param msg
 * @returns {boolean|*}
 */
const fromBot = msg => msg.author.bot && messageWithPrefix(msg)

function getImageCanvas (image) {

}

export default {
	sendFile,
	agreed,
	randomEmoticonWithTag,
	wafucry,
	hasThisImage,
	messageStartsWith,
	messageWithPrefix,
	afterPrefix,
	afterCommand,
	containsCommand,
	fromBot
}
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var prefix = process.env.BOT_PREFIX;

function isEmpty(str) {
	return !str || 0 === str.length;
}

/**
 * Send a file with message to the given channel
 * @param channel
 * @param filenames
 * @param msg
 */
function sendFile(channel, filenames, msg) {
	msg = msg || "";
	var options = {
		files: filenames
	};

	channel.send(msg, options);
}

/**
 * Agree with the person
 * @param msg
 */
var agreed = function agreed(msg) {
	sendFile(msg.channel, ['./assets/this.jpg'], msg.member.displayName + " agrees!");
	console.log('Agreed!');
};
var wafucry = function wafucry(msg) {
	sendFile(msg.channel, ['./assets/wafucry.gif']);
	console.log(msg.member.displayName + " made Wafu cry in " + msg.channel);
};

var cistartsWith = function cistartsWith(text, search) {
	return text.toLowerCase().startsWith(search.toLowerCase());
};
var messageStartsWith = function messageStartsWith(msg, text) {
	return cistartsWith(msg.content, text);
};
var messageWithPrefix = function messageWithPrefix(msg) {
	return messageStartsWith(msg, prefix);
};
var afterPrefix = function afterPrefix(msg) {
	return msg.content.substring(prefix.length).trim();
};
var containsCommand = function containsCommand(msg, text) {
	return !msg.author.bot && messageWithPrefix(msg) && cistartsWith(afterPrefix(msg), text);
};
var fromBot = function fromBot(msg) {
	return msg.author.bot && messageWithPrefix(msg);
};

// const

exports.default = {
	sendFile: sendFile,
	agreed: agreed,
	wafucry: wafucry,
	messageStartsWith: messageStartsWith,
	messageWithPrefix: messageWithPrefix,
	afterPrefix: afterPrefix,
	containsCommand: containsCommand,
	fromBot: fromBot
};
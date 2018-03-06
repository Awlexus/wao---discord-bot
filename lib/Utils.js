"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require("../src/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var cistartsWith = function cistartsWith(text, search) {
	return text.toLowerCase().startsWith(search.toLowerCase());
};
var messageStartsWith = function messageStartsWith(msg, text) {
	return cistartsWith(msg.content, text);
};
var messageWithPrefix = function messageWithPrefix(msg) {
	return messageStartsWith(msg, _config2.default.prefix);
};
var afterPrefix = function afterPrefix(msg) {
	return msg.content.substring(_config2.default.prefix.length).trim();
};
var containsCommand = function containsCommand(msg, text) {
	return !msg.author.bot && messageWithPrefix(msg) && cistartsWith(afterPrefix(msg), text);
};
var fromBot = function fromBot(msg) {
	return msg.author.bot && messageWithPrefix(msg);
};

exports.default = {
	sendFile: sendFile,
	agreed: agreed,
	messageStartsWith: messageStartsWith,
	messageWithPrefix: messageWithPrefix,
	afterPrefix: afterPrefix,
	containsCommand: containsCommand,
	fromBot: fromBot
};
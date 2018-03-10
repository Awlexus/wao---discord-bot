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
function agreed(msg) {
  sendFile(msg.channel, ['./assets/this.jpg'], msg.member.displayName + " agrees!");
  console.log('Agreed!');
}

/**
 * Somebody made wafu cry!
 * @param msg
 */
function wafucry(msg) {
  sendFile(msg.channel, ['./assets/wafucry.gif']);
  console.log(msg.member.displayName + " made Wafu cry in " + msg.channel);
}

function hasThisImage(msg) {
  return msg.attachments && !!msg.attachments.find(function (next) {
    return next.filename === 'jjba-stardust-crusaders-kakyoin-pose.jpg';
  });
}

/**
 * Case insensitive version of startsWith
 * @param text
 * @param search
 * @returns {boolean}
 */
var cistartsWith = function cistartsWith(text, search) {
  return text.toLowerCase().startsWith(search.toLowerCase());
};

/**
 * Checks whether the message starts with a certain text (case insensitive)
 * @param msg
 * @param text
 * @returns {boolean}
 */
var messageStartsWith = function messageStartsWith(msg, text) {
  return cistartsWith(msg.content, text);
};

/**
 * Checks whether the message starts with the defined prefix (Case insensitive)
 * @param msg
 * @returns {*}
 */
var messageWithPrefix = function messageWithPrefix(msg) {
  return messageStartsWith(msg, prefix);
};

/**
 * Returns the text after the prefix
 * @param msg
 * @returns {string}
 */
var afterPrefix = function afterPrefix(msg) {
  return msg.content.substring(prefix.length).trim();
};

/**
 * Checks whether the starts with the prefix followed by the specified command (Case insensitive)
 * @param msg
 * @param text
 * @returns {boolean|*}
 */
var containsCommand = function containsCommand(msg, text) {
  return !msg.author.bot && messageWithPrefix(msg) && cistartsWith(afterPrefix(msg), text);
};

/**
 * Checks if a bot tried to issue a command
 * @param msg
 * @returns {boolean|*}
 */
var fromBot = function fromBot(msg) {
  return msg.author.bot && messageWithPrefix(msg);
};

function getImageCanvas(image) {}

exports.default = {
  sendFile: sendFile,
  agreed: agreed,
  wafucry: wafucry,
  hasThisImage: hasThisImage,
  messageStartsWith: messageStartsWith,
  messageWithPrefix: messageWithPrefix,
  afterPrefix: afterPrefix,
  containsCommand: containsCommand,
  fromBot: fromBot
};
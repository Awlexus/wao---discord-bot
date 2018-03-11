'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.commands = undefined;

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findUser(user, callback) {
	_firebase2.default.database().ref('users').child(user.id).once('value').then(function (snapshot) {
		callback(snapshot.val());
	});
}

function insertPermission(user, name, callback) {
	_firebase2.default.database().ref('users/').child(user.id).child(name).set(true).then(function (err) {
		return callback(err);
	});
}

/**
 * Send the author of the message the help menu
 * @param msg
 */
function sendHelpMenu(msg) {
	msg.author.send('All commands are case insensitive and you can even whitespaces between the prefix and the command\n\t```' + prefixed.map(function (item) {
		return '' + (item[3] ? "" : process.env.BOT_PREFIX) + item[0] + ' - ' + item[1];
	}).join('\n') + '\n\t```');
}

function callCommand(msg) {
	var content = _Utils2.default.afterPrefix(msg);
	if (!content) {
		msg.reply('soup');
	} else {
		var command = _Utils2.default.splitOnFirstWord(content).toLowerCase();
		var match = prefixed.find(function (cmd) {
			return cmd[0] === command;
		});

		if (match) match[2](msg);
	}
}

var prefixed = [['ping', 'pong', function (msg) {
	return msg.channel.send('pong');
}], ['help', 'See the help menu', function (msg) {
	return sendHelpMenu(msg);
}], ['rei', "Displays a random emoticon. If a tag is provided, it'll search for an fitting emoticon", function (msg) {
	return msg.channel.send(_Utils2.default.randomEmoticonWithTag(_Utils2.default.afterCommand(msg, 'rei')));
}], ['shrug', '¯\\_(ツ)_/¯', function (msg) {
	return msg.channel.send('¯\\_(ツ)_/¯');
}], ['wafucry', 'Makes Wafu cry', function (msg) {
	return _Utils2.default.wafucry(msg);
}], ['tag', 'tells you your tag', function (msg) {
	return msg.reply('Your tag is ' + msg.author.tag);
}], ['username', 'tells you your username', function (msg) {
	return msg.reply('Your username is ' + msg.author.username);
}], ['displayName', 'tells you your displayname', function (msg) {
	return msg.reply('Your displayName is ' + msg.author.displayName);
}], ['^', 'tells you your displayname', "", true]];

var commands = exports.commands = [[function (msg) {
	return _Utils2.default.hasThisImage(msg);
}, function (msg) {
	return msg.reply('please stop using this image. I have a command for this. Just type ^ and I\'ll do it for you.\nPlease stop wasting your own bandwidth');
}], [function (msg) {
	return _Utils2.default.fromBot(msg);
}, function (msg) {
	return msg.channel.send('Ayy bitch, nobody allowed you to call me!');
}], [function (msg) {
	return _Utils2.default.messageWithPrefix(msg);
}, function (msg) {
	return callCommand(msg);
}], [function (msg) {
	return _Utils2.default.messageStartsWith(msg, '^');
}, function (msg) {
	return _Utils2.default.agreed(msg);
}]];

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
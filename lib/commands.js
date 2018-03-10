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

var commands = exports.commands = [[function (msg) {
	return _Utils2.default.hasThisImage(msg);
}, function (msg) {
	return msg.reply('please stop using this image. I have a command for this. Just type ^ and I\'ll do it for you.\nPlease stop wasting your own bandwidth');
}], [function (msg) {
	return _Utils2.default.fromBot(msg);
}, function (msg) {
	return msg.channel.send('Ayy bitch, nobody allowed you to call me!');
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'ping');
}, function (msg) {
	return msg.channel.send('pong');
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'rei');
}, function (msg) {
	return msg.channel.send(_Utils2.default.randomEmoticonWithTag(_Utils2.default.afterCommand(msg, 'rei')));
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'shrug');
}, function (msg) {
	return msg.channel.send('¯\\_(ツ)_/¯');
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'wafucry');
}, function (msg) {
	return _Utils2.default.wafucry(msg);
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'tag');
}, function (msg) {
	return msg.reply('Your tag is ' + msg.author.tag);
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'username');
}, function (msg) {
	return msg.reply('Your username is ' + msg.author.username);
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'displayName');
}, function (msg) {
	return msg.reply('Your displayName is ' + msg.author.displayName);
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'thiser');
}, function (msg) {
	if (msg.author.id !== '205980900247207936') {
		msg.reply('you are not my boss');
	}

	var users = msg.mentions.users;
	var user = users.size ? users.first() : msg.author;
	var isAuthor = msg.author === user;

	var username = isAuthor ? 'You' : user.username;

	findUser(user, function (match) {
		if (match) {
			msg.channel.send(username + ' can already use ^');
		} else {
			insertPermission(user, 'thiser', function (err) {
				if (err) {
					console.log(err);
					msg.channel.send('something went wrong ;_;');
				}
			});
			msg.channel.send(username + ' can now use ^');
		}
	});
}], [function (msg) {
	return _Utils2.default.messageWithPrefix(msg) && !_Utils2.default.afterPrefix(msg);
}, function (msg) {
	return msg.reply('Soup');
}], [function (msg) {
	return _Utils2.default.messageStartsWith(msg, '^');
}, function (msg) {
	return _Utils2.default.agreed(msg);
}]];
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.commands = undefined;

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var thisers = new _nedb2.default({ filename: '../db/thisers.db', autoload: true });

function findUser(db, user, callback) {
	db.findOne({ uid: user.id }, function (err, user) {
		return callback(user);
	});
}

function insertUser(db, user, fields) {
	var doc = fields ? fields(user) : {};
	doc['uid'] = user.id;

	db.insert(doc);
}

var commands = exports.commands = [[function (msg) {
	return _Utils2.default.fromBot(msg);
}, function (msg) {
	return msg.channel.send('Ayy bitch, nobody allowed you to call me!');
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'ping');
}, function (msg) {
	return msg.channel.send('pong');
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'shrug');
}, function (msg) {
	return msg.channel.send('¯\\_(ツ)_/¯');
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
	return _Utils2.default.containsCommand(msg, 'mention');
}, function (msg) {
	var mentions = msg.mentions.members;
	if (mentions.size > 0) msg.channel.send('Mentioned people ' + mentions.array());else msg.channel.send('You mentioned nobody');
}], [function (msg) {
	return _Utils2.default.containsCommand(msg, 'thiser');
}, function (msg) {
	if (msg.author.id !== '205980900247207936') {
		msg.reply('you are not my boss');
	}

	var users = msg.mentions.users;

	var user = users.length ? users.first() : msg.author;
	var isAuthor = msg.author === user;

	var usertext = isAuthor ? 'Your are' : user.username + 'is';

	findUser(thisers, user, function (match) {
		if (match) {
			msg.channel.send(usertext + ' can already use ^');
		} else {
			insertUser(thisers, user);
			msg.channel.send(usertext + ' can now use ^');
		}
	});
}], [function (msg) {
	return _Utils2.default.messageWithPrefix(msg) && !_Utils2.default.afterPrefix(msg);
}, function (msg) {
	return msg.reply('You called?');
}], [function (msg) {
	return _Utils2.default.messageStartsWith(msg, '^');
}, function (msg) {
	findUser(thisers, msg.author, function (match) {
		if (match) _Utils2.default.agreed(msg);
	});
}]];
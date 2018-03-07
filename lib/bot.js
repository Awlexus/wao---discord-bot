"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // imports


var _discord = require("discord.js");

var _discord2 = _interopRequireDefault(_discord);

var _commands = require("./commands");

var _config = require("../src/config");

var _config2 = _interopRequireDefault(_config);

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

app.get('/', function (req, res, next) {
	res.send('Fuck you, Heroku')
})

server.listen(process.env.PORT || 5000)
*/
_firebase2.default.initializeApp({
	apiKey: "apiKeyAIzaSyBQJ21osUTMhYwg2LPNejwaeFdxLBO_ibI",
	authDomain: "wao-bot.firebaseapp.com",
	databaseURL: "https://wao-bot.firebaseio.com/"
});

var client = new _discord2.default.Client();

client.on('ready', function () {
	console.log("Logged in as " + client.user.tag + "!");
});

client.on('message', function (msg) {
	_commands.commands.some(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    condition = _ref2[0],
		    action = _ref2[1];

		if (condition(msg)) {
			action(msg);
			return true;
		}
	});
});

client.login(_config2.default.token);
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // imports


var _discord = require("discord.js");

var _discord2 = _interopRequireDefault(_discord);

var _commands = require("./commands");

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebase2.default.initializeApp({
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL
});

var client = new _discord2.default.Client();

client.on('ready', function () {
	console.log("Logged in as " + client.user.tag + "!");
});

client.on('message', function (msg) {
	if (msg.author !== client.user) _commands.commands.some(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    condition = _ref2[0],
		    action = _ref2[1];

		if (condition(msg)) {
			action(msg);
			return true;
		}
	});
});

client.login(process.env.BOT_TOKEN);
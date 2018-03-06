// imports
import Discord from "discord.js"
import {commands} from "./commands"
import config from "../src/config"
import Firebase from "firebase"

var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

app.get('/', function (req, res, next) {
	res.send('Fuck you, Heroku  ')
})

server.listen(process.env.PORT || 5000)

Firebase.initializeApp({
	apiKey: "apiKeyAIzaSyBQJ21osUTMhYwg2LPNejwaeFdxLBO_ibI",
	authDomain: "wao-bot.firebaseapp.com",
	databaseURL: "https://wao-bot.firebaseio.com/",
})

const database = Firebase.database()
const client = new Discord.Client()

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
	commands.some(([condition, action]) => {
		if (condition(msg)) {
			action(msg)
			return true
		}
	})
})

client.login(config.token)
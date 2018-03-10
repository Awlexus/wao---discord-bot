// imports
import Discord from "discord.js"
import {commands} from "./commands"
import Firebase from "firebase"

Firebase.initializeApp({
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
})

const client = new Discord.Client()

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
	if (msg.author !== client.user)
		commands.some(([condition, action]) => {
			if (condition(msg)) {
				action(msg)
				return true
			}
		})
})

client.login(process.env.BOT_TOKEN)
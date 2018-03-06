// imports
import Discord from "discord.js"
import {commands} from "./commands"
import config from "../src/config"

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
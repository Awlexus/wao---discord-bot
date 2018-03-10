var emoticons = require('emoticon-data/emoticons')['emoticons']
var custom_emoticons = require('../custom_emojis')
console.log(custom_emoticons)
emoticons.concat(custom_emoticons)
console.log(custom_emoticons.length)
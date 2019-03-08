const Discord = require('discord.js')
const fs = require('fs')
const config = require('./settings/config.json')
const blacklist = require('./settings/serverdata.json')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) {
        console.log('Не удалось найти команды.');
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
})
bot.on('ready', () => {
    console.log(`${bot.user.username} online!`);
    bot.user.setPresence({
        game: {
            name: 'Игра'
        }
    })
})
bot.on('message', async message => {

    // Blacklisting Words
    if (blacklist.blacklist_status) {
        var black_list_datos = blacklist.blacklist_words
        if (black_list_datos.length >= 0) {
            for (var x = 0; x < black_list_datos.length; x++) {
                if (message.content.toLowerCase().includes(black_list_datos[x].toLowerCase())) {
                    message.delete()
                    message.channel.send("**" + message.author.username + "** ваше сообщение содержит слово, которое было добавлено в черный список.")
                    return
                }
            }
        }
    }

    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
})
bot.login(config.token);
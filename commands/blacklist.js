const Discord = require("discord.js");
const fs = require("fs");
const blacklist = require("../settings/serverdata.json");
const prefix = require("../settings/config.json");

module.exports.run = async (bot, message, args) => {
  let prfx = prefix.prefix
  let list = blacklist.blacklist_words
  if(message.author.id != '318675372537544705') return;
  if(!args[0]) return message.channel.send({
    embed: {
      color: 0x3498DB,
      title: 'Команды blacklist',
      fields: [
        {name: `${prfx}blacklist add [Слово]`, value: 'Добавить слово в черный список.'},
        {name: `${prfx}blacklist del [Слово]`, value: 'Удалить слово из черного списка.'},
        {name: `${prfx}blacklist status on/off`, value: 'Чтобы деактивировать или активировать черный список.'},
        {name: `${prfx}blacklist list`, value: 'Посмотреть слова в черном списке'}
      ]
    }
  })
  if(args[0] == "add"){
    if(!args[1]) return message.channel.send("Вам нужно поставить слово.")
    var palabra = args.slice(1).join(" ")
    list.push(palabra)
    fs.writeFile("./settings/serverdata.json", JSON.stringify(blacklist), (error) => {
      if (error) console.log(error)
  })
    return message.channel.send("Слово **"+palabra+"** только что был добавлен в черный список правильно.")
  }
  else if(args[0] == "del"){ //para eliminar
    if(list.length <= 0) return message.channel.send("На данный момент нет данных в черном списке")
    if(!args[1]) return message.channel.send("Вам нужно указать слово (поставить цифры, а не буквы или символы)")
    var number = args[1]
    if(isNaN(number)) return message.channel.send("Вам нужно поставить число, а не буквы или символы.")
    number = parseInt(number)
    if(number <= 0 || number > list.length) return message.channel.send("Вам нужно поставить действительный индекс.")
    list.splice([number-1], 1)
    fs.writeFile("./settings/serverdata.json", JSON.stringify(blacklist), (error) => {
      if (error) console.log(error)
  })
    return message.channel.send("Слово с указателем **"+number+"** только что был правильно удален из черного списка.")

  }
  else if(args[0] == "list"){ //para ver
    if(list.length <= 0) return message.channel.send("На данный момент нет данных в черном списке.")

    var new_index_list = []
    for(var x = 0; x < list.length; x++) {
      new_index_list.push("index ["+parseInt(x+1)+"], слово: "+list[x])
    }

    var embed = new Discord.RichEmbed()
    embed.setColor("RANDOM")
    embed.addField("Список","`"+new_index_list.join(" | ")+"`")
    embed.setThumbnail(bot.user.displayAvatarURL)
    return message.channel.send(embed)


  }
  else if(args[0] == "status"){ //para activar o desactivar
    if(!args[1]) return message.channel.send("Вам нужно поставить **on**, чтобы активировать или **off**, чтобы деактивировать.")
    if(args[1] == "on") {
      blacklist.blacklist_status = true
      fs.writeFile("./settings/serverdata.json", JSON.stringify(blacklist), (error) => {
        if (error) console.log(error)
    })
      return message.channel.send("Статус черного списка только что был активирован.")
    }
    else if(args[1] == "off") {
      blacklist.blacklist_status = false
      fs.writeFile("./settings/serverdata.json", JSON.stringify(blacklist), (error) => {
        if (error) console.log(error)
    })
      return message.channel.send("Статус черного списка только что был деактивирован.")
    }
    else{
      return message.channel.send("Вам нужно поставить **on**активировать или **off**дезактивировать.")
    }
  }else{
    return message.channel.send({
      embed: {
        color: 0x3498DB,
        title: 'Команды blacklist',
        fields: [
          {name: `${prfx}blacklist add [Слово]`, value: 'Добавить слово в черный список.'},
          {name: `${prfx}blacklist del [Слово]`, value: 'Удалить слово из черного списка.'},
          {name: `${prfx}blacklist status on/off`, value: 'Чтобы деактивировать или активировать черный список.'},
          {name: `${prfx}blacklist list`, value: 'Посмотреть слова в черном списке'}
        ]
      }
    })
   }
}

module.exports.help = {
  name: "blacklist"
}

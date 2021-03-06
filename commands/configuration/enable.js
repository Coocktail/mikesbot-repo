const db = require(`quick.db`)

module.exports = {
    name: "enable",
    description: "Enable a command",
    usage: "[p]enable <Command>",
    category: "configuration",
    run: async(bot, message, args)=>{
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`You need to be a server admin in order to enable a command.`)
        if(args[0] && bot.commands.has(args[0])){
            let discheck = db.get(`disabled_${message.guild.id}_${args[0]}`)
            if(discheck==true) {
                db.set(`enabled_${message.guild.id}_${args[0]}`, true)
                db.set(`disabled_${message.guild.id}_${args[0]}`, false)
                message.channel.send(`Succesfully enabled **${args[0]}** !`)
            
            } else {
                message.channel.send(`This command isn\'t disabled!`)
            }
        } else {
            message.channel.send(`No command found for: **${args[0]}**`)
        }
    }
}

const DiscordTools = require('../discordTools/discordTools.js');
const { MessageEmbed } = require("discord.js");

module.exports = async function (rustplus, client, message) {
    let instance = client.readInstanceFile(rustplus.guildId);
    let channel = DiscordTools.getTextChannelById(rustplus.guildId, instance.channelId.teamchat);
    console.log("chat handler step 1")
    if (message.message.startsWith(rustplus.trademarkString)) {
        return;
    }
    console.log("chat handler step 2")

    if (channel !== undefined) {
        console.log("chat handler step 3")
        let embed = new MessageEmbed()
            .setColor(message.color)
            .setDescription(`**${message.name}**: ${message.message}`)

        await channel.send({ embeds: [embed] });
        console.log("chat handler step 4")
    }
}
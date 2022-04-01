const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require("discord.js")
const { existsSync } = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Shows the current server\'s map'),
    async execute(client, interaction) {
        await interaction.deferReply();
        if (!interaction.inGuild()) {
            return await interaction.editReply({ content: "Not in guild", ephermal: true })
        }
        let guildId = interaction.guildId;
        let instance = client.readInstanceFile(guildId);
        let rustplus = client.rustplusInstances[guildId];
        if (!rustplus || !rustplus.server || !rustplus.port) {
            return await interaction.editReply({ content: "Hey! Maybe try actually selecting a server first??", ephermal: true })
        }
        let server = `${rustplus.server}-${rustplus.port}`;
        if (!rustplus) {
            return;
        }
        let fileDestination = `src/resources/images/maps/${guildId}_map.png`;
        if (!existsSync(fileDestination)) {
            return await interaction.editReply({ content: "Hey, I couldn't find the map stored anywhere? You sure that you're connected to a server?", ephermal: true })
        }
        let file = new MessageAttachment(`src/resources/images/maps/${guildId}_map.png`);
        await interaction.editReply({
            embeds: [new MessageEmbed()
                .setColor('BLUE')
                .setTitle('Server Map')
                .setImage(`attachment://${guildId}_map.png`)
                .setTimestamp()
                .setFooter({
                    text: instance.serverList[server].title
                })
            ],
            files: [file]
        });
    },
};

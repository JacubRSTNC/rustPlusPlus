const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wipe')
		.setDescription('Shows time since the last wipe.'),
	async execute(client, interaction) {
        if (!await client.validatePermissions(interaction)) return;
		await interaction.deferReply({ ephemeral: true });
        let rustplus = client.rustplusInstances[interaction.guildId];
		if (!rustplus || (rustplus && !rustplus.ready)) {
			let str = 'Not currently connected to a rust server.';
			await client.interactionEditReply(interaction, {
				embeds: [new MessageEmbed()
					.setColor('#ff0040')
					.setDescription(`\`\`\`diff\n- ${str}\n\`\`\``)],
				ephemeral: true
			});
			client.log('WARNING', str);
			return;
		}
        await interaction.editReply(rustplus.info.getTimeSinceWipe());
		client.log('INFO', 'Displaying wipe message.');
	},
};

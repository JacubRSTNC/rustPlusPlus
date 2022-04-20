const DiscordTools = require('../discordTools/discordTools.js');
const { Permissions } = require('discord.js');

module.exports = async (client, guild, category) => {
    await addTextChannel('information', client, guild, category);
    await addTextChannel('servers', client, guild, category);
    await addTextChannel('settings', client, guild, category);
    await addTextChannel('events', client, guild, category);
    await addTextChannel('teamchat', client, guild, category, true);
    await addTextChannel('switches', client, guild, category);
    await addTextChannel('alarms', client, guild, category);
    await addTextChannel('storageMonitors', client, guild, category);
    await addTextChannel('activity', client, guild, category);
};

async function addTextChannel(name, client, guild, parent, permissionWrite = false) {
    let instance = client.readInstanceFile(guild.id);

    let channel = undefined;
    if (instance.channelId[name] !== null) {
        channel = DiscordTools.getTextChannelById(guild.id, instance.channelId[name]);
    }
    if (channel === undefined) {
        channel = await DiscordTools.addTextChannel(guild.id, name);
        instance.channelId[name] = channel.id;
        client.writeInstanceFile(guild.id, instance);

        try {
            channel.setParent(parent.id);
        }
        catch (e) {
            client.log('ERROR', `Could not set parent for channel: ${channel.id}`, 'error');
        }
    }

    if (instance.firstTime) {
        try {
            channel.setParent(parent.id);
        }
        catch (e) {
            client.log('ERROR', `Could not set parent for channel: ${channel.id}`, 'error');
        }
    }

    if (permissionWrite && instance.firstTime) {
        try {
            channel.permissionOverwrites.set([
                {
                    id: channel.guild.roles.everyone.id,
                    allow: [Permissions.FLAGS.SEND_MESSAGES]
                }
            ]);
        }
        catch (e) {
            client.log('ERROR', 'Could not set permissionOverwrite.', 'error');
        }
    }
}
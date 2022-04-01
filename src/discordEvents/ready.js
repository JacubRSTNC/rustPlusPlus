module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.log('INFO', 'LOGGED IN AS: ' + client.user.tag);

        client.user.setActivity('/help', { type: 'LISTENING' });
        client.guilds.cache.forEach(async (guild) => {
            await client.setupGuild(guild);
        });

        client.createRustplusInstancesFromConfig();
    },
};
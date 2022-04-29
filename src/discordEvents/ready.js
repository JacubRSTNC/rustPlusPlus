const BattlemetricsTrackerHandler = require('../handlers/battlemetricsTrackerHandler.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.log('INFO', 'LOGGED IN AS: ' + client.user.tag);

        client.user.setActivity('/help', { type: 'LISTENING' });
        client.guilds.cache.forEach(async (guild) => {
            await client.setupGuild(guild);
        });

        BattlemetricsTrackerHandler.handler(client);
        client.battlemetricsIntervalId = setInterval(
            BattlemetricsTrackerHandler.handler,
            60000,
            client);

        client.createRustplusInstancesFromConfig();
    },
};
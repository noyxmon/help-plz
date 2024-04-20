const client = require('../../index');
const colors = require('colors');
const { ActivityType } = require('discord.js');

module.exports = {
    name: "ready",
};

client.once('ready', async () => {

    client.user.setActivity({
        name: 'Tickets',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=1HUPyeETcHk'
    })

    console.log("----------------------------------------".white);
    console.log(`[READY] ${client.user.tag} is up and ready to go.`.bold)
    console.log("----------------------------------------".white);

})

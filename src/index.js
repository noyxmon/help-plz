require('./console/watermark')
const { Client, Partials, Collection, ActivityType } = require('discord.js');
const colors = require('colors');
const config = require('./config/config.json')
const path = require('path');

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildPresences",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates"
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
})

if (!config.TOKEN) {
    console.log("Token".yellow.bold + "\n")
    return process.exit();
};

client.commands = new Collection()
client.events = new Collection()
client.slash = new Collection()
client.aliases = new Collection()
client.config = require("./config/config.json")

module.exports = client;

["event", "slash"].forEach(file => {
    require(`./handlers/${file}`)(client);
});


client.login(config.TOKEN)
    .catch((err) => {
        console.log("[CRUSH] Something went wrong while connecting to your bot" + "\n");
        console.log("[CRUSH] Error from DiscordAPI :" + err);
        process.exit();
    })
process.on("unhandledRejection", async (err) => {
    console.log(`[ANTI - CRUSH] Unhandled Rejection : ${err.stack}`)
})

const express = require("express");
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
});

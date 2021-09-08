require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({ intents: [ "GUILDS", "GUILD_MESSAGES" ] });

const config = require('./config.json');

client.on('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    client.logChannel = client.channels.cache.get(config.channelId);
});

client.on('messageCreate', msg => {
    if (!config.ignoreBot && msg.author.bot) return;

    client.logChannel.send(`**Message Created** ${msg.createdAt} <#${msg.channel.id}> (${msg.channel.name} ${msg.channel.id}) <@${msg.author.id}> (${msg.author.tag} ${msg.author.id})\n\`\`\`${msg.content}\`\`\``);
});

client.on('messageUpdate', (oldMsg, newMsg) => {
    if (!config.ignoreBot && oldMsg.author.bot) return;

    client.logChannel.send(`**Message Updated** <#${oldMsg.channel.id}> (${oldMsg.channel.name} ${oldMsg.channel.id}) <@${oldMsg.author.id}> (${oldMsg.author.tag} ${oldMsg.author.id})\nPrevious ${newMsg.createdAt}\n\`\`\`${oldMsg.content}\`\`\`Now ${newMsg.editedAt}\n\`\`\`${newMsg.content}\`\`\``)
});

client.login();
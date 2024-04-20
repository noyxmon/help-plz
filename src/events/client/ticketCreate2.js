const client = require('../../index');
const { ActionRowBuilder, PermissionsBitFields, PermissionsBitField, ButtonBuilder, ChannelType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');

module.exports = {
    name: "ticketCreate"
};
client.on("interactionCreate", async (interaction) => {

    if (interaction.isButton()) {
        if (interaction.customId.startsWith(`icket-setup-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[3]

            const moda = new ModalBuilder()
                .setCustomId(`moda-${interaction.guild.id}-${id}`)
                .setTitle(`Tickets Server 2`);

            const ticketreason = new TextInputBuilder()
                .setCustomId(`ticket-reason`)
                .setLabel("Reason")
                .setPlaceholder("Why You Created This Ticket?")
                .setStyle(TextInputStyle.Short)
                .setMinLength(1)
                .setMaxLength(1000);

            const firstActionRow = new ActionRowBuilder().addComponents(ticketreason);

            moda.addComponents(firstActionRow);

            await interaction.showModal(moda);
        }
    }

    if (interaction.customId.startsWith(`lose-ticket`)) {
        const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`)

        const moda1 = new ModalBuilder()
        .setCustomId(`moda1`)
        .setTitle(`Ticket Deleting`);

        const delreason = new TextInputBuilder()
        .setCustomId(`ticket-del`)
        .setLabel("Reason")
        .setPlaceholder("Why You Wanna Delete This Ticket?")
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(1000);

        const firstActionRow = new ActionRowBuilder().addComponents(delreason);

        moda1.addComponents(firstActionRow);

        await interaction.showModal(moda1);
     }

     if (interaction.isModalSubmit()) {
        if (interaction.customId.startsWith(`moda1`)) {
            const reason = interaction.fields.getTextInputValue('ticket-del');
            const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`)
            const targetChannelId = 'channelid';
            const file = await createTranscript(interaction.channel,  {
                returnBuffer: false,
                filename: `${interaction.channel.name}.html`
            });

            await client.channels.cache.get(targetChannelId).send({ content: `${interaction.channel.name}
            **Reason** - ${reason} `, files: [file]});
            await channel.delete();
            await interaction.reply({ content: ' ', ephemeral: true });
        }
     }

    if (interaction.isModalSubmit()) {
        if (interaction.customId.startsWith(`moda-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[2]

            const reason = interaction.fields.getTextInputValue('ticket-reason');

            const category = interaction.guild.channels.cache.get(`${id}`)

            await interaction.guild.channels.create({
                parent: category.id,
                name: `ticket-${interaction.user.username}`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SendMessages', 'ViewChannel'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: client.user.id,
                        allow: ['ManageChannels', 'SendMessages', 'ViewChannel']
                    }
                ],
                type: ChannelType.GuildText,
            }).then(async c => {
                interaction.reply({
                    content: `Ticket Generated Go To <#${c.id}>`,
                    ephemeral: true
                });

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`lose-ticket-${interaction.user.id}`)
                            .setLabel("Delete")
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji('1228724319249764382')
                    )

                const embed = new EmbedBuilder()
                    .setTitle(`<a:catjam:1228724782661505055> Ticket Created`)
                    .setAuthor({ name: `${interaction.user.username}'s Ticket`, iconURL: interaction.user.displayAvatarURL() })
                    .setDescription(`<a:list:1228724305752227911> **Wait For Our Response**‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎‎ ‎ ‎`)
                    .setFooter({ text: "Xcia Tickets" })
                    .addFields(
                        { name: "Reason", value: `<a:arrow:1228724367714811977> ${reason}` }
                    )
                    .setColor("#1a0032")

                c.send({
                    content: `${interaction.user} <@&1228721378447065168> <@&1228721380976103464> <@&1228749895456915487> <@&1228721379390783501> <@886301232266870794>`,
                    components: [row],
                    embeds: [embed]
                })
            })
        }
    }
})


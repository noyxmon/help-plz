const client = require('../../index');
const { ActionRowBuilder, ButtonBuilder, ChannelType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');

module.exports = {
    name: "ticketCreate"
};

client.on("interactionCreate", async (interaction) => {

    if (interaction.isButton()) {
        if (interaction.customId.startsWith(`ticket-setup-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[3]

            const modal = new ModalBuilder()
                .setCustomId(`modal-${interaction.guild.id}-${id}`)
                .setTitle(`Tickets Server 1`);

            const ticketreason = new TextInputBuilder()
                .setCustomId(`ticket-reason`)
                .setLabel("Reason")
                .setPlaceholder("Why You Created This Ticket?")
                .setStyle(TextInputStyle.Short)
                .setMinLength(10)
                .setMaxLength(1000);

            const firstActionRow = new ActionRowBuilder().addComponents(ticketreason);

            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);
        }

        if (interaction.customId.startsWith(`close-ticket`)) {
            await interaction.deferUpdate()
            const id = interaction.customId.split('-')[2];

            const user = interaction.guild.members.cache.get(`${id}`);
            const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`)

            if (!channel.permissionsFor(interaction.user.id).has("ManageMessages")) {
                return interaction.followUp({
                    content: `Not Allowed Buddy`,
                    ephemeral: true
                })
            }

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("close-ticket")
                        .setLabel("Closed")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true)
                )

            interaction.editReply({
                components: [row]
            })
            
            
            await channel.permissionOverwrites.edit(user, {
                  ViewChannel: false
            }).then(() => {
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`545`)
                            .setLabel("‎ ‎Delete")
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji('1208177414555828244')
                    )
                return interaction.channel.send({
                    components: [row]
                });
            }).catch(error => {
                console.error(error);
            });
        }
    }
    if (interaction.customId.startsWith(`545`)) {
        const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`)

        const targetChannelId = 'channelid';

        const file = await createTranscript(interaction.channel,  {
            returnBuffer: false,
            filename: `${interaction.channel.name}.html`
        });

        var msg = await client.channels.cache.get(targetChannelId).send({ content: `${interaction.channel.name}`, files: [file]});



        await channel.delete();
        }

    if (interaction.isModalSubmit()) {
        if (interaction.customId.startsWith(`modal-${interaction.guild.id}`)) {
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
                            .setCustomId(`close-ticket-${interaction.user.id}`)
                            .setLabel("Close Ticket")
                            .setStyle(ButtonStyle.Secondary)
                    )

                const embed = new EmbedBuilder()
                    .setTitle(`<a:catjam:1218153314764718150> Ticket Created`)
                    .setAuthor({ name: `${interaction.user.username}'s Ticket`, iconURL: interaction.user.displayAvatarURL() })
                    .setDescription(`<a:list:1215605657856770068> **Wait For Our Response**‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎‎ ‎ ‎`)
                    .setFooter({ text: "Xcia Tickets" })
                    .addFields(
                        { name: "Reason", value: `<a:arrow:1215601724341878815> ${reason}` }
                    )
                    .setColor("#1a0032")

                c.send({
                    content: `${interaction.user} <@&1205539778217644042> <@&1205904056116187196> <@&1205900423274430514> <@886301232266870794>`,
                    components: [row],
                    embeds: [embed]
                })
            })
        }
    }
})

import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ticket-support')
    .setDescription('Système de support VRP'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Support VRP - Île de France RP')
      .setDescription('Bienvenue dans le support de Île de France RP !\n\nPour soumettre une demande, **cliquez** simplement sur le bouton ci-dessous. Une fois le ticket créé, merci de fournir **toutes** les informations nécessaires afin que notre équipe puisse vous aider **rapidement** et **efficacement**.\n\n> Le règlement reste valable, même dans les tickets.')
      .setThumbnail('https://cdn.discordapp.com/emojis/1505190731386720387.png')
      .setFooter({ text: 'Verlaine RP - Support' })
      .setTimestamp();

    const selectMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('ticket_select')
          .setPlaceholder('Sélectionnez une catégorie')
          .addOptions(
            {
              label: 'Administration',
              value: 'ticket_admin',
              emoji: '1506748481518305491',
              description: 'Problème administratif'
            },
            {
              label: 'Partenariat développement',
              value: 'ticket_partner',
              emoji: '1505190484992069682',
              description: 'Proposition de partenariat'
            },
            {
              label: 'Ticket Autre',
              value: 'ticket_other',
              description: 'Autre demande'
            }
          )
      );

    await interaction.reply({ embeds: [embed], components: [selectMenu] });
  }
};

import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from 'discord.js';

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

    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('ticket_admin_menu')
          .setLabel('Administration')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('1506748481518305491'),
        new ButtonBuilder()
          .setCustomId('ticket_partner_menu')
          .setLabel('Partenariat développement')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('1505190484992069682'),
        new ButtonBuilder()
          .setCustomId('ticket_other_menu')
          .setLabel('Ticket Autre')
          .setStyle(ButtonStyle.Secondary)
      );

    await interaction.reply({ embeds: [embed], components: [buttons] });
  }
};

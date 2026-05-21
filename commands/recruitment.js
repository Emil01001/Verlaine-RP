import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('recruitment')
    .setDescription('Candidature pour rejoindre le staff')
    .addStringOption(option =>
      option.setName('poste')
        .setDescription('Poste demandé')
        .setRequired(true)
        .addChoices(
          { name: 'Modérateur', value: 'moderator' },
          { name: 'Admin', value: 'admin' },
          { name: 'Responsable', value: 'manager' }
        )
    )
    .addStringOption(option =>
      option.setName('experience')
        .setDescription('Votre expérience')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const poste = interaction.options.getString('poste');
    const experience = interaction.options.getString('experience');

    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle('📋 Candidature Staff')
      .addFields(
        { name: 'Candidat', value: interaction.user.username, inline: true },
        { name: 'Poste', value: poste, inline: true },
        { name: 'Expérience', value: experience },
        { name: 'Statut', value: '⏳ En attente' }
      )
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('recruitment_approve')
          .setLabel('Approuver')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('recruitment_reject')
          .setLabel('Refuser')
          .setStyle(ButtonStyle.Danger)
      );

    await interaction.reply({ embeds: [embed], components: [row] });
  }
};

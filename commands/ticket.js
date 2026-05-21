import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Crée un ticket de support')
    .addStringOption(option =>
      option.setName('sujet')
        .setDescription('Sujet du ticket')
        .setRequired(true)
        .addChoices(
          { name: 'Administration', value: 'admin' },
          { name: 'Partenariat', value: 'partnership' },
          { name: 'Support', value: 'support' },
          { name: 'Recrutement', value: 'recruitment' }
        )
    )
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Description du problème')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const sujet = interaction.options.getString('sujet');
    const description = interaction.options.getString('description');

    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle('🎫 Nouveau Ticket')
      .addFields(
        { name: 'Sujet', value: sujet, inline: true },
        { name: 'Statut', value: '🟢 Ouvert', inline: true },
        { name: 'Description', value: description }
      )
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('ticket_close')
          .setLabel('Fermer')
          .setStyle(ButtonStyle.Danger)
      );

    await interaction.reply({ embeds: [embed], components: [row] });
  }
};

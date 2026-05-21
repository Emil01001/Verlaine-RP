import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ticket-create')
    .setDescription('Crée un nouveau ticket de support'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle('🎫 Créer un Ticket')
      .setDescription('Sélectionnez la catégorie de votre ticket')
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('ticket_category')
          .setPlaceholder('Choisir une catégorie...')
          .addOptions(
            {
              label: '🛠️ Administration',
              value: 'admin',
              description: 'Problèmes administratifs'
            },
            {
              label: '🤝 Partenariat',
              value: 'partnership',
              description: 'Propositions de partenariat'
            },
            {
              label: '📞 Support',
              value: 'support',
              description: 'Support technique'
            },
            {
              label: '👥 Recrutement',
              value: 'recruitment',
              description: 'Candidature staff'
            },
            {
              label: '⚖️ Appel Sanction',
              value: 'appeal',
              description: 'Contester une sanction'
            }
          )
      );

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  }
};

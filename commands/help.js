import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche l\'aide'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle('📖 Aide - Verlaine RP')
      .setDescription('Voici toutes les commandes disponibles:')
      .addFields(
        { name: '💰 Économie', value: '/rp-economy, /rp-bank, /rp-crypto', inline: false },
        { name: '💼 Métiers', value: '/rp-job, /rp-police, /rp-doctor, /rp-lawyer', inline: false },
        { name: '🏠 Immobilier', value: '/rp-property, /rp-realtor', inline: false },
        { name: '🚗 Véhicules', value: '/rp-vehicle, /rp-mechanic, /rp-taxi', inline: false },
        { name: '⚖️ Légal', value: '/rp-legal, /rp-crime', inline: false },
        { name: '🏢 Organisations', value: '/rp-org, /rp-restaurant', inline: false },
        { name: '❤️ Santé', value: '/rp-health', inline: false },
        { name: '💍 Social', value: '/rp-marriage, /rp-friends', inline: false },
        { name: '🎓 Éducation', value: '/rp-school', inline: false },
        { name: '🏋️ Loisirs', value: '/rp-gym, /rp-casino, /rp-events', inline: false },
        { name: '👤 Profil', value: '/rp-profile, /help', inline: false }
      )
      .setFooter({ text: 'Verlaine RP - Tapez /help pour cette aide' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('boost')
    .setDescription('Affiche les informations de boost du serveur'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle('🚀 Boost du Serveur')
      .addFields(
        { name: 'Niveau de boost', value: '📊 Niveau 3', inline: true },
        { name: 'Boosts actifs', value: '12', inline: true },
        { name: 'Avantages', value: '✅ Qualité audio 256kbps\n✅ Emojis illimités\n✅ Bannière personnalisée' }
      )
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

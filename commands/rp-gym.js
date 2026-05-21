import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-gym')
    .setDescription('Salle de sport')
    .addSubcommand(sub => sub.setName('stats').setDescription('Voir vos stats'))
    .addSubcommand(sub => sub.setName('train').setDescription('S\'entraîner').addStringOption(o => o.setName('exercice').setDescription('Exercice').setRequired(true).addChoices({name: 'Musculation', value: 'muscle'}, {name: 'Cardio', value: 'cardio'}, {name: 'Yoga', value: 'yoga'})))
    .addSubcommand(sub => sub.setName('membership').setDescription('Voir l\'abonnement')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ff0000').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'stats') {
      embed.setTitle('💪 Vos stats').addFields(
        { name: 'Force', value: '85/100 💪', inline: true },
        { name: 'Endurance', value: '75/100 🏃', inline: true },
        { name: 'Flexibilité', value: '60/100 🧘', inline: true },
        { name: 'Poids', value: '85kg', inline: true },
        { name: 'Muscle', value: '35%', inline: true },
        { name: 'Graisse', value: '15%', inline: true }
      );
    } else if (sub === 'train') {
      const exercice = interaction.options.getString('exercice');
      embed.setTitle('✅ Entraînement').setColor('#00ff00').addFields(
        { name: 'Exercice', value: exercice, inline: true },
        { name: 'Durée', value: '1h', inline: true },
        { name: 'Calories brûlées', value: '500', inline: false }
      );
    } else if (sub === 'membership') {
      embed.setTitle('🏋️ Abonnement').addFields(
        { name: 'Type', value: 'Premium', inline: true },
        { name: 'Valide jusqu\'au', value: '31/12/2024', inline: true },
        { name: 'Prix/mois', value: '$50', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

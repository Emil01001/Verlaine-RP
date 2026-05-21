import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-taxi')
    .setDescription('Service de taxi')
    .addSubcommand(sub => sub.setName('call').setDescription('Appeler un taxi'))
    .addSubcommand(sub => sub.setName('status').setDescription('Voir le statut'))
    .addSubcommand(sub => sub.setName('earnings').setDescription('Voir les gains')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ffff00').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'call') {
      embed.setTitle('✅ Taxi appelé').setColor('#00ff00').addFields(
        { name: 'Chauffeur', value: 'Bob Johnson', inline: true },
        { name: 'Véhicule', value: '🚕 Taxi Bleu', inline: true },
        { name: 'Temps d\'arrivée', value: '3 minutes', inline: false },
        { name: 'Tarif estimé', value: '$25', inline: true }
      );
    } else if (sub === 'status') {
      embed.setTitle('📍 Statut').addFields(
        { name: 'Position', value: 'Downtown', inline: true },
        { name: 'Passager', value: 'Oui', inline: true },
        { name: 'Destination', value: 'Pillbox Hill', inline: false },
        { name: 'Temps restant', value: '8 minutes', inline: true }
      );
    } else if (sub === 'earnings') {
      embed.setTitle('💰 Gains').addFields(
        { name: 'Aujourd\'hui', value: '$450', inline: true },
        { name: 'Cette semaine', value: '$2,100', inline: true },
        { name: 'Ce mois', value: '$8,500', inline: true },
        { name: 'Courses', value: '45', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

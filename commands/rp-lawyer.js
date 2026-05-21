import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-lawyer')
    .setDescription('Commandes avocat')
    .addSubcommand(sub => sub.setName('cases').setDescription('Voir les dossiers'))
    .addSubcommand(sub => sub.setName('defend').setDescription('Défendre un client').addUserOption(o => o.setName('client').setDescription('Client').setRequired(true)))
    .addSubcommand(sub => sub.setName('negotiate').setDescription('Négocier'))
    .addSubcommand(sub => sub.setName('fees').setDescription('Voir les honoraires')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#9900ff').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'cases') {
      embed.setTitle('⚖️ Dossiers').addFields(
        { name: 'Affaire 1', value: 'Vol - En cours', inline: false },
        { name: 'Affaire 2', value: 'Fraude - Jugement demain', inline: false },
        { name: 'Affaire 3', value: 'Agression - Appel en attente', inline: false }
      );
    } else if (sub === 'defend') {
      const client = interaction.options.getUser('client');
      embed.setTitle('✅ Défense').setColor('#00ff00').addFields({ name: 'Client', value: client.username, inline: true }, { name: 'Chef d\'accusation', value: 'À déterminer', inline: true });
    } else if (sub === 'negotiate') {
      embed.setTitle('💬 Négociation').addFields(
        { name: 'Partie adverse', value: 'Procureur', inline: true },
        { name: 'Statut', value: 'En cours', inline: true },
        { name: 'Offre', value: '$50,000', inline: false }
      );
    } else if (sub === 'fees') {
      embed.setTitle('💰 Honoraires').addFields(
        { name: 'Consultation', value: '$300', inline: true },
        { name: 'Défense', value: '$1,000/heure', inline: true },
        { name: 'Appel', value: '$2,000', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

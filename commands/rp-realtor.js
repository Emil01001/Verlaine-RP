import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-realtor')
    .setDescription('Immobilier')
    .addSubcommand(sub => sub.setName('listings').setDescription('Voir les annonces'))
    .addSubcommand(sub => sub.setName('buy').setDescription('Acheter une propriété'))
    .addSubcommand(sub => sub.setName('sell').setDescription('Vendre une propriété'))
    .addSubcommand(sub => sub.setName('commissions').setDescription('Voir les commissions')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ff9900').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'listings') {
      embed.setTitle('🏠 Annonces').addFields(
        { name: 'Maison Pillbox', value: '$250,000', inline: true },
        { name: 'Appartement Downtown', value: '$150,000', inline: true },
        { name: 'Villa Vinewood', value: '$500,000', inline: true },
        { name: 'Boutique', value: '$300,000', inline: true }
      );
    } else if (sub === 'buy') {
      embed.setTitle('✅ Achat').setColor('#00ff00').addFields(
        { name: 'Propriété', value: 'Maison Pillbox', inline: true },
        { name: 'Prix', value: '$250,000', inline: true },
        { name: 'Commission', value: '$12,500', inline: false }
      );
    } else if (sub === 'sell') {
      embed.setTitle('✅ Vente').setColor('#00ff00').addFields(
        { name: 'Propriété', value: 'Maison Downtown', value: '$240,000', inline: false },
        { name: 'Commission', value: '$12,000', inline: true }
      );
    } else if (sub === 'commissions') {
      embed.setTitle('💰 Commissions').addFields(
        { name: 'Aujourd\'hui', value: '$5,000', inline: true },
        { name: 'Cette semaine', value: '$25,000', inline: true },
        { name: 'Ce mois', value: '$100,000', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

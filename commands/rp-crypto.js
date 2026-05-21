import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-crypto')
    .setDescription('Trading de crypto-monnaies')
    .addSubcommand(sub => sub.setName('market').setDescription('Voir le marché'))
    .addSubcommand(sub => sub.setName('buy').setDescription('Acheter').addStringOption(o => o.setName('crypto').setDescription('Crypto').setRequired(true).addChoices({name: 'Bitcoin', value: 'btc'}, {name: 'Ethereum', value: 'eth'}, {name: 'Dogecoin', value: 'doge'})).addIntegerOption(o => o.setName('quantite').setDescription('Quantité').setRequired(true)))
    .addSubcommand(sub => sub.setName('sell').setDescription('Vendre').addStringOption(o => o.setName('crypto').setDescription('Crypto').setRequired(true).addChoices({name: 'Bitcoin', value: 'btc'}, {name: 'Ethereum', value: 'eth'}, {name: 'Dogecoin', value: 'doge'})).addIntegerOption(o => o.setName('quantite').setDescription('Quantité').setRequired(true)))
    .addSubcommand(sub => sub.setName('portfolio').setDescription('Voir son portefeuille')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ffaa00').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'market') {
      embed.setTitle('📈 Marché crypto').addFields(
        { name: '₿ Bitcoin', value: '$45,000', inline: true },
        { name: '🔷 Ethereum', value: '$2,500', inline: true },
        { name: '🐕 Dogecoin', value: '$0.25', inline: true }
      );
    } else if (sub === 'buy') {
      const crypto = interaction.options.getString('crypto');
      const qty = interaction.options.getInteger('quantite');
      embed.setTitle('✅ Achat').setColor('#00ff00').addFields({ name: 'Crypto', value: crypto, inline: true }, { name: 'Quantité', value: qty.toString(), inline: true });
    } else if (sub === 'sell') {
      const crypto = interaction.options.getString('crypto');
      const qty = interaction.options.getInteger('quantite');
      embed.setTitle('✅ Vente').setColor('#00ff00').addFields({ name: 'Crypto', value: crypto, inline: true }, { name: 'Quantité', value: qty.toString(), inline: true });
    } else if (sub === 'portfolio') {
      embed.setTitle('💼 Portefeuille').addFields(
        { name: '₿ Bitcoin', value: '2.5 BTC ($112,500)', inline: true },
        { name: '🔷 Ethereum', value: '10 ETH ($25,000)', inline: true },
        { name: '🐕 Dogecoin', value: '1000 DOGE ($250)', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

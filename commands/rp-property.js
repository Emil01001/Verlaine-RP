import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-property')
    .setDescription('Gestion des propriétés')
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription('Lister vos propriétés')
    )
    .addSubcommand(sub =>
      sub.setName('buy')
        .setDescription('Acheter une propriété')
        .addStringOption(opt =>
          opt.setName('type')
            .setDescription('Type de propriété')
            .setRequired(true)
            .addChoices(
              { name: '🏠 Maison', value: 'house' },
              { name: '🏢 Appartement', value: 'apartment' },
              { name: '🏬 Boutique', value: 'shop' },
              { name: '🏭 Usine', value: 'factory' }
            )
        )
    )
    .addSubcommand(sub =>
      sub.setName('sell')
        .setDescription('Vendre une propriété')
    )
    .addSubcommand(sub =>
      sub.setName('rent')
        .setDescription('Louer une propriété')
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'list') {
      const embed = new EmbedBuilder()
        .setColor('#ff9900')
        .setTitle('🏠 Vos propriétés')
        .addFields(
          { name: '🏠 Maison Pillbox', value: 'Valeur: $250,000\nLoyer: $5,000/mois', inline: false },
          { name: '🏢 Appartement Downtown', value: 'Valeur: $150,000\nLoyer: $3,000/mois', inline: false },
          { name: '🏬 Boutique Vêtements', value: 'Valeur: $500,000\nRevenu: $10,000/mois', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'buy') {
      const type = interaction.options.getString('type');
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Propriété achetée')
        .addFields(
          { name: 'Type', value: type, inline: true },
          { name: 'Prix', value: '$250,000', inline: true },
          { name: 'Localisation', value: 'Pillbox Hill', inline: false },
          { name: 'Hypothèque', value: '$10,000/mois', inline: true },
          { name: 'Durée', value: '30 mois', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'sell') {
      const embed = new EmbedBuilder()
        .setColor('#ffaa00')
        .setTitle('💰 Propriété vendue')
        .addFields(
          { name: 'Propriété', value: 'Maison Pillbox', inline: true },
          { name: 'Prix de vente', value: '$240,000', inline: true },
          { name: 'Argent reçu', value: '+$240,000', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'rent') {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🔑 Propriétés à louer')
        .addFields(
          { name: '🏠 Maison Downtown', value: '$8,000/mois', inline: true },
          { name: '🏢 Appartement Midtown', value: '$5,000/mois', inline: true },
          { name: '🏠 Villa Vinewood', value: '$15,000/mois', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

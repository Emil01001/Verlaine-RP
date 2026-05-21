import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-crime')
    .setDescription('Activités criminelles')
    .addSubcommand(sub =>
      sub.setName('gang')
        .setDescription('Gestion du gang')
    )
    .addSubcommand(sub =>
      sub.setName('heist')
        .setDescription('Planifier un braquage')
        .addStringOption(opt =>
          opt.setName('type')
            .setDescription('Type de braquage')
            .setRequired(true)
            .addChoices(
              { name: '🏦 Banque', value: 'bank' },
              { name: '🏪 Magasin', value: 'store' },
              { name: '💎 Bijouterie', value: 'jewelry' },
              { name: '🏪 Supermarché', value: 'supermarket' }
            )
        )
    )
    .addSubcommand(sub =>
      sub.setName('drug')
        .setDescription('Trafic de drogue')
    )
    .addSubcommand(sub =>
      sub.setName('wanted')
        .setDescription('Voir votre niveau de recherche')
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'gang') {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('👊 Votre gang')
        .addFields(
          { name: 'Nom', value: 'Los Santos Cartel', inline: true },
          { name: 'Rang', value: 'Capitaine', inline: true },
          { name: 'Membres', value: '45', inline: true },
          { name: 'Territoire', value: 'Pillbox, Rancho', inline: true },
          { name: 'Trésor', value: '$500,000', inline: true },
          { name: 'Réputation', value: '⭐⭐⭐⭐⭐', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'heist') {
      const type = interaction.options.getString('type');
      const embed = new EmbedBuilder()
        .setColor('#ffaa00')
        .setTitle('💰 Braquage planifié')
        .addFields(
          { name: 'Type', value: type, inline: true },
          { name: 'Difficulté', value: '⭐⭐⭐⭐', inline: true },
          { name: 'Gain estimé', value: '$50,000 - $100,000', inline: false },
          { name: 'Équipe requise', value: '4 personnes', inline: true },
          { name: 'Temps', value: '30 minutes', inline: true },
          { name: 'Risque', value: 'Très élevé ⚠️', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'drug') {
      const embed = new EmbedBuilder()
        .setColor('#9900ff')
        .setTitle('💊 Trafic de drogue')
        .addFields(
          { name: 'Drogue disponible', value: '🍃 Weed, 🔴 Cocaïne, 💊 Meth', inline: false },
          { name: 'Stock Weed', value: '50kg - $5,000/kg', inline: true },
          { name: 'Stock Cocaïne', value: '25kg - $8,000/kg', inline: true },
          { name: 'Stock Meth', value: '10kg - $12,000/kg', inline: true },
          { name: 'Revenu mensuel', value: '$150,000', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'wanted') {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('🚨 Niveau de recherche')
        .addFields(
          { name: 'Niveau', value: '⭐⭐⭐ (3 étoiles)', inline: true },
          { name: 'Raison', value: 'Braquage de banque', inline: true },
          { name: 'Prime', value: '$25,000', inline: false },
          { name: 'Statut', value: '🚔 Recherché activement', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

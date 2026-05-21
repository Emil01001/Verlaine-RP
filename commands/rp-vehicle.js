import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-vehicle')
    .setDescription('Gestion des véhicules')
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription('Liste vos véhicules')
    )
    .addSubcommand(sub =>
      sub.setName('buy')
        .setDescription('Acheter un véhicule')
        .addStringOption(opt =>
          opt.setName('modele')
            .setDescription('Modèle du véhicule')
            .setRequired(true)
            .addChoices(
              { name: '🚗 Adder', value: 'adder' },
              { name: '🏎️ Zentorno', value: 'zentorno' },
              { name: '🚙 Granger', value: 'granger' },
              { name: '🚕 Taxi', value: 'taxi' },
              { name: '🏍️ Bati', value: 'bati' },
              { name: '🚐 Rumpo', value: 'rumpo' }
            )
        )
    )
    .addSubcommand(sub =>
      sub.setName('customize')
        .setDescription('Customiser un véhicule')
        .addStringOption(opt =>
          opt.setName('type')
            .setDescription('Type de customisation')
            .setRequired(true)
            .addChoices(
              { name: '🎨 Couleur', value: 'color' },
              { name: '⚙️ Moteur', value: 'engine' },
              { name: '🛞 Roues', value: 'wheels' },
              { name: '🔊 Système audio', value: 'audio' }
            )
        )
    )
    .addSubcommand(sub =>
      sub.setName('sell')
        .setDescription('Vendre un véhicule')
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'list') {
      const embed = new EmbedBuilder()
        .setColor('#ff00ff')
        .setTitle('🚗 Vos véhicules')
        .addFields(
          { name: '🏎️ Zentorno', value: 'Plaque: VRP-001\nCouleur: Noir\nÉtat: Excellent', inline: false },
          { name: '🚙 Granger', value: 'Plaque: VRP-002\nCouleur: Blanc\nÉtat: Bon', inline: false },
          { name: '🏍️ Bati', value: 'Plaque: VRP-003\nCouleur: Rouge\nÉtat: Excellent', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'buy') {
      const modele = interaction.options.getString('modele');
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Véhicule acheté')
        .addFields(
          { name: 'Modèle', value: modele, inline: true },
          { name: 'Prix', value: '$45,000', inline: true },
          { name: 'Plaque', value: 'VRP-004', inline: true },
          { name: 'Assurance', value: '$5,000/mois', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'customize') {
      const type = interaction.options.getString('type');
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🎨 Customisation')
        .addFields(
          { name: 'Type', value: type, inline: true },
          { name: 'Coût', value: '$2,500', inline: true },
          { name: 'Statut', value: '✅ Customisation appliquée', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'sell') {
      const embed = new EmbedBuilder()
        .setColor('#ffaa00')
        .setTitle('💰 Véhicule vendu')
        .addFields(
          { name: 'Véhicule', value: 'Zentorno', inline: true },
          { name: 'Prix de vente', value: '$40,000', inline: true },
          { name: 'Argent reçu', value: '+$40,000', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-health')
    .setDescription('Gestion de la santé')
    .addSubcommand(sub =>
      sub.setName('status')
        .setDescription('Voir votre statut de santé')
    )
    .addSubcommand(sub =>
      sub.setName('hospital')
        .setDescription('Aller à l\'hôpital')
    )
    .addSubcommand(sub =>
      sub.setName('doctor')
        .setDescription('Appeler un médecin')
    )
    .addSubcommand(sub =>
      sub.setName('heal')
        .setDescription('Utiliser un item de soin')
        .addStringOption(opt =>
          opt.setName('item')
            .setDescription('Item de soin')
            .setRequired(true)
            .addChoices(
              { name: '💊 Bandage', value: 'bandage' },
              { name: '💉 Seringue', value: 'syringe' },
              { name: '🩹 Pansement', value: 'plaster' }
            )
        )
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'status') {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('❤️ Statut de santé')
        .addFields(
          { name: 'Santé', value: '85/100 🟢', inline: true },
          { name: 'Faim', value: '60/100 🟡', inline: true },
          { name: 'Soif', value: '40/100 🔴', inline: true },
          { name: 'Énergie', value: '70/100 🟢', inline: true },
          { name: 'Blessures', value: 'Légères', inline: true },
          { name: 'Statut', value: '✅ Bon', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'hospital') {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🏥 Hôpital')
        .addFields(
          { name: 'Localisation', value: 'Pillbox Medical Center', inline: true },
          { name: 'Distance', value: '500m', inline: true },
          { name: 'Coût de traitement', value: '$500', inline: false },
          { name: 'Temps d\'attente', value: '5 minutes', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'doctor') {
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Médecin appelé')
        .addFields(
          { name: 'Médecin', value: 'Dr. Johnson', inline: true },
          { name: 'Temps d\'arrivée', value: '3 minutes', inline: true },
          { name: 'Coût', value: '$300', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'heal') {
      const item = interaction.options.getString('item');
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Soin appliqué')
        .addFields(
          { name: 'Item utilisé', value: item, inline: true },
          { name: 'Santé restaurée', value: '+15', inline: true },
          { name: 'Nouvelle santé', value: '100/100', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

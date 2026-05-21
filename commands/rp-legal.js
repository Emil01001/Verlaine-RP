import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-legal')
    .setDescription('Gestion légale')
    .addSubcommand(sub =>
      sub.setName('contract')
        .setDescription('Créer un contrat')
        .addStringOption(opt =>
          opt.setName('type')
            .setDescription('Type de contrat')
            .setRequired(true)
            .addChoices(
              { name: '💼 Emploi', value: 'employment' },
              { name: '🏠 Location', value: 'rental' },
              { name: '💰 Prêt', value: 'loan' },
              { name: '🤝 Partenariat', value: 'partnership' }
            )
        )
    )
    .addSubcommand(sub =>
      sub.setName('license')
        .setDescription('Voir vos licences')
    )
    .addSubcommand(sub =>
      sub.setName('criminal')
        .setDescription('Voir votre dossier criminel')
    )
    .addSubcommand(sub =>
      sub.setName('arrest')
        .setDescription('Voir vos arrestations')
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'contract') {
      const type = interaction.options.getString('type');
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('📝 Contrat créé')
        .addFields(
          { name: 'Type', value: type, inline: true },
          { name: 'Numéro', value: 'CTR-2024-001', inline: true },
          { name: 'Date', value: new Date().toLocaleDateString('fr-FR'), inline: true },
          { name: 'Statut', value: '⏳ En attente de signature', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'license') {
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('📋 Vos licences')
        .addFields(
          { name: '🚗 Permis de conduire', value: 'Valide ✅', inline: true },
          { name: '🔫 Permis d\'arme', value: 'Valide ✅', inline: true },
          { name: '✈️ Permis de pilote', value: 'Expiré ❌', inline: true },
          { name: '⚖️ Licence d\'avocat', value: 'Valide ✅', inline: true },
          { name: '🏥 Licence médicale', value: 'Valide ✅', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'criminal') {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('📋 Dossier criminel')
        .addFields(
          { name: 'Antécédents', value: 'Aucun', inline: false },
          { name: 'Amendes', value: '$0', inline: true },
          { name: 'Mandats', value: 'Aucun', inline: true },
          { name: 'Statut', value: '✅ Propre', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'arrest') {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('🚔 Historique d\'arrestation')
        .addFields(
          { name: 'Arrestations', value: '0', inline: true },
          { name: 'Dernière arrestation', value: 'Jamais', inline: true },
          { name: 'Temps total en prison', value: '0 jours', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

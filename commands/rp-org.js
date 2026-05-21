import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-org')
    .setDescription('Gestion des organisations')
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription('Lister les organisations')
    )
    .addSubcommand(sub =>
      sub.setName('join')
        .setDescription('Rejoindre une organisation')
        .addStringOption(opt =>
          opt.setName('org')
            .setDescription('Organisation')
            .setRequired(true)
            .addChoices(
              { name: '🚔 LSPD', value: 'lspd' },
              { name: '🚒 SAFD', value: 'safd' },
              { name: '🏥 Pillbox', value: 'pillbox' },
              { name: '⚖️ Avocats', value: 'lawyers' },
              { name: '💼 Taxi', value: 'taxi' }
            )
        )
    )
    .addSubcommand(sub =>
      sub.setName('members')
        .setDescription('Voir les membres')
    )
    .addSubcommand(sub =>
      sub.setName('treasury')
        .setDescription('Voir le trésor')
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'list') {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🏢 Organisations')
        .addFields(
          { name: '🚔 LSPD', value: 'Police - 150 membres', inline: true },
          { name: '🚒 SAFD', value: 'Pompiers - 80 membres', inline: true },
          { name: '🏥 Pillbox', value: 'Hôpital - 60 membres', inline: true },
          { name: '⚖️ Avocats', value: 'Cabinet - 40 membres', inline: true },
          { name: '💼 Taxi', value: 'Compagnie - 100 membres', inline: true },
          { name: '🏭 Mécaniciens', value: 'Garage - 50 membres', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'join') {
      const org = interaction.options.getString('org');
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Candidature envoyée')
        .addFields(
          { name: 'Organisation', value: org, inline: true },
          { name: 'Statut', value: '⏳ En attente d\'approbation', inline: true },
          { name: 'Temps d\'attente', value: '24-48h', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'members') {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('👥 Membres de votre organisation')
        .addFields(
          { name: '👑 Président', value: 'John Smith', inline: true },
          { name: '📊 Vice-Président', value: 'Marie Dupont', inline: true },
          { name: '🛡️ Capitaine', value: '5 personnes', inline: true },
          { name: '👮 Officier', value: '15 personnes', inline: true },
          { name: '👤 Membre', value: '120 personnes', inline: true },
          { name: '📈 Total', value: '150 membres', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'treasury') {
      const embed = new EmbedBuilder()
        .setColor('#ffaa00')
        .setTitle('💰 Trésor de l\'organisation')
        .addFields(
          { name: 'Solde', value: '$2,500,000', inline: true },
          { name: 'Revenu/jour', value: '+$50,000', inline: true },
          { name: 'Dépenses/jour', value: '-$20,000', inline: true },
          { name: 'Bénéfice net', value: '+$30,000/jour', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

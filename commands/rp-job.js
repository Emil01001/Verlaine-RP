import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-job')
    .setDescription('Gestion des métiers')
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription('Liste tous les métiers disponibles')
    )
    .addSubcommand(sub =>
      sub.setName('apply')
        .setDescription('Postuler pour un métier')
        .addStringOption(opt => 
          opt.setName('metier')
            .setDescription('Métier')
            .setRequired(true)
            .addChoices(
              { name: '👮 Policier', value: 'cop' },
              { name: '🚑 Médecin', value: 'doctor' },
              { name: '⚖️ Avocat', value: 'lawyer' },
              { name: '🚕 Taxi', value: 'taxi' },
              { name: '🔧 Mécanicien', value: 'mechanic' },
              { name: '👨‍🍳 Cuisinier', value: 'chef' },
              { name: '🏗️ Constructeur', value: 'builder' },
              { name: '📦 Livreur', value: 'delivery' }
            )
        )
    )
    .addSubcommand(sub =>
      sub.setName('salary')
        .setDescription('Voir son salaire')
    )
    .addSubcommand(sub =>
      sub.setName('work')
        .setDescription('Travailler')
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'list') {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('💼 Métiers disponibles')
        .addFields(
          { name: '👮 Policier', value: '$150/h - Salaire stable', inline: true },
          { name: '🚑 Médecin', value: '$180/h - Très demandé', inline: true },
          { name: '⚖️ Avocat', value: '$200/h - Prestige', inline: true },
          { name: '🚕 Taxi', value: '$100/h - Flexible', inline: true },
          { name: '🔧 Mécanicien', value: '$120/h - Utile', inline: true },
          { name: '👨‍🍳 Cuisinier', value: '$110/h - Créatif', inline: true },
          { name: '🏗️ Constructeur', value: '$140/h - Physique', inline: true },
          { name: '📦 Livreur', value: '$90/h - Rapide', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'apply') {
      const metier = interaction.options.getString('metier');
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Candidature acceptée')
        .setDescription(`Vous êtes maintenant ${metier}!`)
        .addFields(
          { name: 'Métier', value: metier, inline: true },
          { name: 'Salaire/h', value: '$150', inline: true },
          { name: 'Statut', value: '🟢 Actif', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'salary') {
      const embed = new EmbedBuilder()
        .setColor('#ffaa00')
        .setTitle('💰 Salaire')
        .addFields(
          { name: 'Métier actuel', value: 'Avocat', inline: true },
          { name: 'Salaire/h', value: '$200', inline: true },
          { name: 'Heures travaillées', value: '42h', inline: true },
          { name: 'Prochain paiement', value: 'Dans 1h', inline: true },
          { name: 'Montant estimé', value: '$8,400', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'work') {
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Travail commencé')
        .setDescription('Vous travaillez maintenant!')
        .addFields(
          { name: 'Métier', value: 'Avocat', inline: true },
          { name: 'Durée', value: '1h', inline: true },
          { name: 'Gains', value: '+$200', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

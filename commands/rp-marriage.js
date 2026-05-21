import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-marriage')
    .setDescription('Gestion du mariage')
    .addSubcommand(sub =>
      sub.setName('propose')
        .setDescription('Proposer le mariage')
        .addUserOption(opt =>
          opt.setName('personne')
            .setDescription('Personne à qui proposer')
            .setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub.setName('status')
        .setDescription('Voir votre statut matrimonial')
    )
    .addSubcommand(sub =>
      sub.setName('divorce')
        .setDescription('Demander le divorce')
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'propose') {
      const personne = interaction.options.getUser('personne');
      const embed = new EmbedBuilder()
        .setColor('#ff1493')
        .setTitle('💍 Proposition de mariage')
        .setDescription(`${interaction.user.username} propose le mariage à ${personne.username}!`)
        .addFields(
          { name: 'De', value: interaction.user.username, inline: true },
          { name: 'À', value: personne.username, inline: true },
          { name: 'Statut', value: '⏳ En attente de réponse', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('marriage_accept')
            .setLabel('Accepter')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('marriage_decline')
            .setLabel('Refuser')
            .setStyle(ButtonStyle.Danger)
        );
      
      await interaction.reply({ embeds: [embed], components: [row] });
    }
    
    else if (subcommand === 'status') {
      const embed = new EmbedBuilder()
        .setColor('#ff1493')
        .setTitle('💒 Statut matrimonial')
        .addFields(
          { name: 'Statut', value: 'Marié(e)', inline: true },
          { name: 'Conjoint', value: 'Marie Dupont', inline: true },
          { name: 'Date du mariage', value: '15/03/2024', inline: true },
          { name: 'Durée', value: '2 mois', inline: true },
          { name: 'Communauté de biens', value: '$500,000', inline: true },
          { name: 'Enfants', value: '2', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'divorce') {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('⚖️ Demande de divorce')
        .addFields(
          { name: 'Conjoint', value: 'Marie Dupont', inline: true },
          { name: 'Statut', value: '⏳ En attente', inline: true },
          { name: 'Partage des biens', value: '50/50', inline: false },
          { name: 'Garde des enfants', value: 'À négocier', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

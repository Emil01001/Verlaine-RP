import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-profile')
    .setDescription('Voir le profil')
    .addUserOption(opt => opt.setName('joueur').setDescription('Joueur').setRequired(false)),
  
  async execute(interaction) {
    const user = interaction.options.getUser('joueur') || interaction.user;
    
    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle(`👤 Profil de ${user.username}`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: 'Nom RP', value: 'John Smith', inline: true },
        { name: 'Âge RP', value: '32 ans', inline: true },
        { name: 'Métier', value: 'Avocat', inline: true },
        { name: 'Niveau', value: '45', inline: true },
        { name: 'Réputation', value: '⭐⭐⭐⭐⭐', inline: true },
        { name: 'Argent', value: '$6,250,000', inline: true },
        { name: 'Propriétés', value: '3', inline: true },
        { name: 'Véhicules', value: '5', inline: true },
        { name: 'Statut', value: '✅ Actif', inline: true },
        { name: 'Temps de jeu', value: '500h', inline: true },
        { name: 'Dernière connexion', value: 'Aujourd\'hui', inline: true },
        { name: 'Organisation', value: 'Cabinet d\'avocats', inline: true }
      )
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

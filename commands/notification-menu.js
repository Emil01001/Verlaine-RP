import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('notification-menu')
    .setDescription('Menu de gestion des notifications'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🔔 Gestion des Notifications')
      .setDescription('Personnalisez vos notifications pour rester informé des actualités qui vous intéressent!\n\n**Catégories disponibles:**\n• 📰 Journal - Actualités du serveur\n• 📊 Sondages - Votes et sondages\n• 📢 Annonces - Annonces importantes\n• 🌐 Réseaux - Mises à jour des réseaux sociaux\n• 🔄 Updates - Mises à jour du serveur\n• 🎉 Événementiel - Événements spéciaux\n• ⚠️ Spoils - Avertissements de spoilers')
      .setFooter({ text: 'Verlaine RP - Notifications' })
      .setTimestamp();

    const selectMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('notif_select')
          .setPlaceholder('📋 Sélectionnez vos notifications')
          .setMinValues(0)
          .setMaxValues(7)
          .addOptions(
            {
              label: 'Notifications Journal',
              value: 'notif_journal',
              emoji: '📰',
              description: 'Actualités et nouvelles du serveur'
            },
            {
              label: 'Notifications Sondages',
              value: 'notif_sondage',
              emoji: '📊',
              description: 'Votes et sondages communautaires'
            },
            {
              label: 'Notifications Annonces',
              value: 'notif_annonces',
              emoji: '📢',
              description: 'Annonces importantes et urgentes'
            },
            {
              label: 'Notifications Réseaux',
              value: 'notif_reseaux',
              emoji: '🌐',
              description: 'Mises à jour des réseaux sociaux'
            },
            {
              label: 'Notifications Updates',
              value: 'notif_updates',
              emoji: '🔄',
              description: 'Mises à jour et patches du serveur'
            },
            {
              label: 'Notifications Événementiel',
              value: 'notif_evenement',
              emoji: '🎉',
              description: 'Événements spéciaux et compétitions'
            },
            {
              label: 'Notifications Spoils',
              value: 'notif_spoils',
              emoji: '⚠️',
              description: 'Avertissements de spoilers'
            }
          )
      );

    await interaction.reply({ embeds: [embed], components: [selectMenu] });
  }
};

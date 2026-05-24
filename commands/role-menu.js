import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('role-menu')
    .setDescription('Menu de sélection de rôles'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🎖️ Sélection de Rôles')
      .setDescription('Choisissez vos rôles ci-dessous pour personnaliser votre expérience sur le serveur!\n\n**Catégories disponibles:**\n• Notifications\n• Intérêts\n• Notifications de Boost')
      .addFields(
        { name: '📢 Notifications', value: 'Recevez les annonces importantes', inline: true },
        { name: '🎮 Intérêts', value: 'Indiquez vos préférences', inline: true },
        { name: '⭐ Boost', value: 'Notifications de boost', inline: true }
      )
      .setFooter({ text: 'Verlaine RP - Rôles' })
      .setTimestamp();

    const selectMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('role_select')
          .setPlaceholder('📋 Sélectionnez vos rôles')
          .setMinValues(0)
          .setMaxValues(3)
          .addOptions(
            {
              label: 'Notifications Annonces',
              value: 'role_notif_annonces',
              emoji: '📢',
              description: 'Recevez les annonces du serveur'
            },
            {
              label: 'Notifications Événements',
              value: 'role_notif_events',
              emoji: '🎉',
              description: 'Recevez les notifications d\'événements'
            },
            {
              label: 'Notifications Mises à Jour',
              value: 'role_notif_updates',
              emoji: '🔄',
              description: 'Recevez les mises à jour'
            },
            {
              label: 'Intéressé par le RP',
              value: 'role_interest_rp',
              emoji: '🎮',
              description: 'Vous êtes intéressé par le roleplay'
            },
            {
              label: 'Intéressé par le Développement',
              value: 'role_interest_dev',
              emoji: '💻',
              description: 'Vous êtes développeur'
            },
            {
              label: 'Notifications de Boost',
              value: 'role_boost_notif',
              emoji: '⭐',
              description: 'Notifications de boost du serveur'
            }
          )
      );

    await interaction.reply({ embeds: [embed], components: [selectMenu] });
  }
};

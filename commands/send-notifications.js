import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { sendJournalNotif, sendPollNotif, sendAnnouncementNotif, sendSocialNotif, sendUpdateNotif, sendEventNotif, sendSpoilNotif } from '../events/notification-handler.js';

export default {
  data: new SlashCommandBuilder()
    .setName('send-notif')
    .setDescription('Envoyer une notification (Staff uniquement)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Type de notification')
        .setRequired(true)
        .addChoices(
          { name: 'Journal', value: 'journal' },
          { name: 'Sondage', value: 'poll' },
          { name: 'Annonce', value: 'announcement' },
          { name: 'Réseaux', value: 'social' },
          { name: 'Update', value: 'update' },
          { name: 'Événement', value: 'event' },
          { name: 'Spoiler', value: 'spoil' }
        )
    )
    .addStringOption(option =>
      option.setName('titre')
        .setDescription('Titre de la notification')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('contenu')
        .setDescription('Contenu de la notification')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const type = interaction.options.getString('type');
    const titre = interaction.options.getString('titre');
    const contenu = interaction.options.getString('contenu');
    const guild = interaction.guild;

    try {
      await interaction.deferReply({ ephemeral: true });

      switch (type) {
        case 'journal':
          await sendJournalNotif(guild, titre, contenu);
          break;
        case 'poll':
          const pollOptions = contenu.split('|').map(opt => opt.trim());
          await sendPollNotif(guild, titre, pollOptions);
          break;
        case 'announcement':
          await sendAnnouncementNotif(guild, titre, contenu);
          break;
        case 'social':
          await sendSocialNotif(guild, titre, contenu);
          break;
        case 'update':
          await sendUpdateNotif(guild, titre, contenu);
          break;
        case 'event':
          await sendEventNotif(guild, titre, contenu);
          break;
        case 'spoil':
          await sendSpoilNotif(guild, titre, contenu);
          break;
      }

      const confirmEmbed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Notification Envoyée')
        .setDescription(`La notification de type **${type}** a été envoyée avec succès!`)
        .addFields(
          { name: 'Titre', value: titre, inline: true },
          { name: 'Type', value: type, inline: true }
        )
        .setFooter({ text: 'Verlaine RP - Notifications' })
        .setTimestamp();

      await interaction.editReply({ embeds: [confirmEmbed] });

    } catch (error) {
      console.error('Erreur envoi notification:', error);
      await interaction.editReply({ content: '❌ Erreur lors de l\'envoi de la notification', ephemeral: true });
    }
  }
};

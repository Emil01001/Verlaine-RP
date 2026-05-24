import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ticket-system-ultra')
    .setDescription('Système de tickets ultra complet'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🎟️ Centre de Support - Île de France RP')
      .setDescription('Bienvenue dans notre centre de support premium!\n\nNous sommes là pour vous aider avec:\n• **Problèmes administratifs** - Bugs, glitches, erreurs\n• **Partenariats** - Collaborations et développements\n• **Autres demandes** - Questions générales\n\nPour soumettre une demande, sélectionnez votre catégorie ci-dessous. Notre équipe vous répondra dans les plus brefs délais.')
      .setFooter({ text: 'Verlaine RP - Support Premium | Temps de réponse: < 1h' })
      .setTimestamp()
      .setThumbnail('https://cdn.discordapp.com/emojis/1505190731386720387.png');

    const selectMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('ticket_ultra_select')
          .setPlaceholder('📋 Sélectionnez une catégorie de support')
          .addOptions(
            {
              label: 'Administration',
              value: 'ticket_admin_ultra',
              emoji: '1506748481518305491',
              description: 'Problèmes administratifs et bugs'
            },
            {
              label: 'Partenariat Développement',
              value: 'ticket_partner_ultra',
              emoji: '1505190484992069682',
              description: 'Propositions de partenariat'
            },
            {
              label: 'Autre Demande',
              value: 'ticket_other_ultra',
              description: 'Autres questions'
            }
          )
      );

    await interaction.reply({ embeds: [embed], components: [selectMenu] });
  }
};

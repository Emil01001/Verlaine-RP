import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('recruitment-panel')
    .setDescription('Système de recrutement staff'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Recrutement - Verlaine Roleplay')
      .setDescription('Bienvenue dans le système de recrutement staff.\n\nChoisissez la catégorie qui vous intéresse dans le menu ci-dessous, puis remplissez le formulaire.\n\n**Catégories disponibles :**\n- Modérateur Test *(ouvert)*\n- Développeur\n*(ouvert)*\n- Communication *(ouvert)*')
      .setFooter({ text: 'Verlaine RP - Recrutement' })
      .setTimestamp();

    const selectMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('recruit_select')
          .setPlaceholder('Sélectionnez une catégorie')
          .addOptions(
            {
              label: 'Modérateur Test',
              value: 'recruit_mod',
              emoji: '1504962828019437738',
              description: 'Rejoignez l\'équipe de modération'
            },
            {
              label: 'Développeur',
              value: 'recruit_dev',
              emoji: '1505204315814363307',
              description: 'Proposez vos services de développement'
            },
            {
              label: 'Communication',
              value: 'recruit_com',
              emoji: '1505241226083831848',
              description: 'Rejoignez l\'équipe de communication'
            }
          )
      );

    await interaction.reply({ embeds: [embed], components: [selectMenu] });
  }
};

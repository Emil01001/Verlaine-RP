import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('recruitment-panel')
    .setDescription('Système de recrutement staff'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle('👔 Recrutement - Verlaine Roleplay')
      .setDescription('Bienvenue dans le système de recrutement staff.\n\nChoisissez la catégorie qui vous intéresse dans le menu ci-dessous, puis remplissez le formulaire.\n\n**Catégories disponibles :**\n- **Modérateur Test** *(ouvert)*\n- **Développeur** *(ouvert)*\n- **Communication** *(ouvert)*')
      .setThumbnail('https://cdn.discordapp.com/emojis/1504962828019437738.png')
      .setFooter({ text: 'Verlaine RP - Recrutement' })
      .setTimestamp();

    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('recruit_mod')
          .setLabel('Modérateur Test')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('1504962828019437738'),
        new ButtonBuilder()
          .setCustomId('recruit_dev')
          .setLabel('Développeur')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('1505204315814363307'),
        new ButtonBuilder()
          .setCustomId('recruit_com')
          .setLabel('Communication')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('1505241226083831848')
      );

    await interaction.reply({ embeds: [embed], components: [buttons] });
  }
};

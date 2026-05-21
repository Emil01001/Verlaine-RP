import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('welcome-system')
    .setDescription('Système de bienvenue'),
  
  async execute(interaction) {
    // Message de bienvenue avec animation
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setDescription('<a:welcome:1504950764370399284> Bienvenue à toi ' + interaction.user + ' sur le serveur de **Verlaine Roleplay** !')
      .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', size: 512 }))
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    // Embed avec les informations
    const infoEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setDescription('N\'hésitez pas à **consulter** le <#1504938519292940370>, pour **toute question** la catégorie <#1504953491041419404> est à votre disposition pour vous aider ! N\'hésitez pas à consulter également <#1504949036086591518> pour rester **informé** des dernières actualités.')
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    await interaction.reply({ embeds: [welcomeEmbed, infoEmbed] });
  }
};

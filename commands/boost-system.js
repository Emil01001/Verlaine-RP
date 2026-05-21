import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('boost-system')
    .setDescription('Système de boost'),
  
  async execute(interaction) {
    const boostEmbed = new EmbedBuilder()
      .setColor('#ff00ff')
      .setDescription('<:boost:1504962792971829308> Merci ' + interaction.user + ' d\'avoir boosté **Verlaine Roleplay** ! 📼\nGrâce à toi le serveur grandit encore plus !')
      .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', size: 512 }))
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    await interaction.reply({ embeds: [boostEmbed] });
  }
};

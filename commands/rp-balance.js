import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-balance')
    .setDescription('Affiche le solde d\'un joueur')
    .addUserOption(option => 
      option.setName('joueur')
        .setDescription('Le joueur')
        .setRequired(false)
    ),
  
  async execute(interaction) {
    const user = interaction.options.getUser('joueur') || interaction.user;
    
    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle('💰 Solde')
      .setDescription(`**${user.username}**`)
      .addFields(
        { name: 'Argent liquide', value: '$1,250,000', inline: true },
        { name: 'Banque', value: '$5,000,000', inline: true },
        { name: 'Total', value: '$6,250,000', inline: false }
      )
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

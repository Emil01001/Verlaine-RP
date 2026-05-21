import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-bank')
    .setDescription('Gestion bancaire')
    .addSubcommand(sub => sub.setName('balance').setDescription('Solde bancaire'))
    .addSubcommand(sub => sub.setName('deposit').setDescription('Dépôt').addIntegerOption(o => o.setName('montant').setDescription('Montant').setRequired(true)))
    .addSubcommand(sub => sub.setName('withdraw').setDescription('Retrait').addIntegerOption(o => o.setName('montant').setDescription('Montant').setRequired(true)))
    .addSubcommand(sub => sub.setName('transfer').setDescription('Virement').addUserOption(o => o.setName('user').setDescription('Destinataire').setRequired(true)).addIntegerOption(o => o.setName('montant').setDescription('Montant').setRequired(true))),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#0099ff').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'balance') {
      embed.setTitle('💰 Solde bancaire').addFields({ name: 'Solde', value: '$5,000,000', inline: false });
    } else if (sub === 'deposit') {
      const montant = interaction.options.getInteger('montant');
      embed.setTitle('✅ Dépôt').setColor('#00ff00').addFields({ name: 'Montant', value: `+$${montant}`, inline: true });
    } else if (sub === 'withdraw') {
      const montant = interaction.options.getInteger('montant');
      embed.setTitle('✅ Retrait').setColor('#00ff00').addFields({ name: 'Montant', value: `-$${montant}`, inline: true });
    } else if (sub === 'transfer') {
      const user = interaction.options.getUser('user');
      const montant = interaction.options.getInteger('montant');
      embed.setTitle('✅ Virement').setColor('#00ff00').addFields({ name: 'À', value: user.username, inline: true }, { name: 'Montant', value: `$${montant}`, inline: true });
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

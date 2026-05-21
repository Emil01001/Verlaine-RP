import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-friends')
    .setDescription('Gestion des amis')
    .addSubcommand(sub => sub.setName('list').setDescription('Voir les amis'))
    .addSubcommand(sub => sub.setName('add').setDescription('Ajouter un ami').addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true)))
    .addSubcommand(sub => sub.setName('remove').setDescription('Supprimer un ami').addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true)))
    .addSubcommand(sub => sub.setName('message').setDescription('Envoyer un message').addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true)).addStringOption(o => o.setName('message').setDescription('Message').setRequired(true))),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#00ff00').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'list') {
      embed.setTitle('👥 Vos amis').addFields(
        { name: 'John Doe', value: '🟢 En ligne', inline: true },
        { name: 'Jane Smith', value: '🟡 Inactif', value: '🔴 Hors ligne', inline: true },
        { name: 'Mike Johnson', value: '🟢 En ligne', inline: true },
        { name: 'Sarah Williams', value: '🟢 En ligne', inline: true }
      );
    } else if (sub === 'add') {
      const user = interaction.options.getUser('user');
      embed.setTitle('✅ Ami ajouté').setColor('#00ff00').addFields({ name: 'Ami', value: user.username, inline: true });
    } else if (sub === 'remove') {
      const user = interaction.options.getUser('user');
      embed.setTitle('✅ Ami supprimé').setColor('#ff0000').addFields({ name: 'Ami', value: user.username, inline: true });
    } else if (sub === 'message') {
      const user = interaction.options.getUser('user');
      const msg = interaction.options.getString('message');
      embed.setTitle('✅ Message envoyé').setColor('#00ff00').addFields({ name: 'À', value: user.username, inline: true }, { name: 'Message', value: msg, inline: false });
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

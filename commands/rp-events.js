import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-events')
    .setDescription('Événements RP')
    .addSubcommand(sub => sub.setName('list').setDescription('Voir les événements'))
    .addSubcommand(sub => sub.setName('join').setDescription('Rejoindre un événement').addStringOption(o => o.setName('event').setDescription('Événement').setRequired(true)))
    .addSubcommand(sub => sub.setName('create').setDescription('Créer un événement').addStringOption(o => o.setName('nom').setDescription('Nom').setRequired(true))),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ff00ff').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'list') {
      embed.setTitle('📅 Événements').addFields(
        { name: '🏁 Course de voitures', value: 'Demain 20h - 50 participants', inline: false },
        { name: '🎭 Concert', value: 'Samedi 19h - 100 participants', inline: false },
        { name: '⚽ Match de foot', value: 'Dimanche 18h - 22 participants', inline: false },
        { name: '💰 Vente aux enchères', value: 'Lundi 15h - Propriétés', inline: false }
      );
    } else if (sub === 'join') {
      const event = interaction.options.getString('event');
      embed.setTitle('✅ Inscription').setColor('#00ff00').addFields({ name: 'Événement', value: event, inline: true }, { name: 'Statut', value: 'Inscrit', inline: true });
    } else if (sub === 'create') {
      const nom = interaction.options.getString('nom');
      embed.setTitle('✅ Événement créé').setColor('#00ff00').addFields(
        { name: 'Nom', value: nom, inline: true },
        { name: 'Créateur', value: interaction.user.username, inline: true },
        { name: 'Participants', value: '1', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

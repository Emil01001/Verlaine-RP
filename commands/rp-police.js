import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-police')
    .setDescription('Commandes police')
    .addSubcommand(sub => sub.setName('dispatch').setDescription('Appels en attente'))
    .addSubcommand(sub => sub.setName('arrest').setDescription('Arrêter quelqu\'un').addUserOption(o => o.setName('suspect').setDescription('Suspect').setRequired(true)))
    .addSubcommand(sub => sub.setName('fine').setDescription('Donner une amende').addUserOption(o => o.setName('personne').setDescription('Personne').setRequired(true)).addIntegerOption(o => o.setName('montant').setDescription('Montant').setRequired(true)))
    .addSubcommand(sub => sub.setName('wanted').setDescription('Voir les recherchés')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#0066ff').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'dispatch') {
      embed.setTitle('📡 Appels en attente').addFields(
        { name: '🚨 Braquage', value: 'Downtown - Priorité haute', inline: false },
        { name: '🚗 Accident', value: 'Pillbox - Priorité moyenne', inline: false },
        { name: '🔫 Tirs', value: 'Rancho - Priorité haute', inline: false }
      );
    } else if (sub === 'arrest') {
      const suspect = interaction.options.getUser('suspect');
      embed.setTitle('✅ Arrestation').setColor('#00ff00').addFields({ name: 'Suspect', value: suspect.username, inline: true }, { name: 'Chef d\'accusation', value: 'À déterminer', inline: true });
    } else if (sub === 'fine') {
      const personne = interaction.options.getUser('personne');
      const montant = interaction.options.getInteger('montant');
      embed.setTitle('✅ Amende').setColor('#00ff00').addFields({ name: 'Personne', value: personne.username, inline: true }, { name: 'Montant', value: `$${montant}`, inline: true });
    } else if (sub === 'wanted') {
      embed.setTitle('🚨 Recherchés').addFields(
        { name: 'John Doe', value: '⭐⭐⭐ - Braquage', inline: false },
        { name: 'Jane Smith', value: '⭐⭐ - Vol', inline: false },
        { name: 'Mike Johnson', value: '⭐⭐⭐⭐ - Meurtre', inline: false }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

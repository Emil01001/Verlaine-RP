import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-restaurant')
    .setDescription('Gestion du restaurant')
    .addSubcommand(sub => sub.setName('menu').setDescription('Voir le menu'))
    .addSubcommand(sub => sub.setName('order').setDescription('Commander').addStringOption(o => o.setName('plat').setDescription('Plat').setRequired(true).addChoices({name: '🍔 Burger', value: 'burger'}, {name: '🍕 Pizza', value: 'pizza'}, {name: '🍝 Pâtes', value: 'pasta'}, {name: '🥩 Steak', value: 'steak'})))
    .addSubcommand(sub => sub.setName('stats').setDescription('Statistiques du restaurant')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ff6600').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'menu') {
      embed.setTitle('🍽️ Menu').addFields(
        { name: '🍔 Burger', value: '$15', inline: true },
        { name: '🍕 Pizza', value: '$20', inline: true },
        { name: '🍝 Pâtes', value: '$18', inline: true },
        { name: '🥩 Steak', value: '$35', inline: true },
        { name: '🍷 Vin', value: '$25', inline: true },
        { name: '🍰 Dessert', value: '$12', inline: true }
      );
    } else if (sub === 'order') {
      const plat = interaction.options.getString('plat');
      embed.setTitle('✅ Commande').setColor('#00ff00').addFields({ name: 'Plat', value: plat, inline: true }, { name: 'Temps', value: '10 min', inline: true });
    } else if (sub === 'stats') {
      embed.setTitle('📊 Statistiques').addFields(
        { name: 'Revenu/jour', value: '$8,000', inline: true },
        { name: 'Clients/jour', value: '120', inline: true },
        { name: 'Employés', value: '8', inline: true },
        { name: 'Évaluation', value: '⭐⭐⭐⭐⭐', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

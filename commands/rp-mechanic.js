import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-mechanic')
    .setDescription('Service mécanique')
    .addSubcommand(sub => sub.setName('repair').setDescription('Réparer un véhicule'))
    .addSubcommand(sub => sub.setName('customize').setDescription('Customiser').addStringOption(o => o.setName('type').setDescription('Type').setRequired(true).addChoices({name: 'Moteur', value: 'engine'}, {name: 'Suspension', value: 'suspension'}, {name: 'Turbo', value: 'turbo'})))
    .addSubcommand(sub => sub.setName('prices').setDescription('Voir les tarifs'))
    .addSubcommand(sub => sub.setName('orders').setDescription('Voir les commandes')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ff6600').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'repair') {
      embed.setTitle('🔧 Réparation').setColor('#00ff00').addFields(
        { name: 'Véhicule', value: 'Zentorno', inline: true },
        { name: 'Coût', value: '$500', inline: true },
        { name: 'Temps', value: '30 min', inline: false }
      );
    } else if (sub === 'customize') {
      const type = interaction.options.getString('type');
      embed.setTitle('✅ Customisation').setColor('#00ff00').addFields({ name: 'Type', value: type, inline: true }, { name: 'Coût', value: '$2,000', inline: true });
    } else if (sub === 'prices') {
      embed.setTitle('💰 Tarifs').addFields(
        { name: 'Réparation simple', value: '$300', inline: true },
        { name: 'Réparation complète', value: '$1,000', inline: true },
        { name: 'Moteur', value: '$5,000', inline: true },
        { name: 'Turbo', value: '$8,000', inline: true }
      );
    } else if (sub === 'orders') {
      embed.setTitle('📋 Commandes').addFields(
        { name: 'Zentorno - Réparation', value: 'En attente', inline: false },
        { name: 'Adder - Customisation', value: 'En cours', inline: false },
        { name: 'Granger - Moteur', value: 'Terminé', inline: false }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-casino')
    .setDescription('Casino')
    .addSubcommand(sub => sub.setName('play').setDescription('Jouer').addStringOption(o => o.setName('jeu').setDescription('Jeu').setRequired(true).addChoices({name: 'Blackjack', value: 'blackjack'}, {name: 'Roulette', value: 'roulette'}, {name: 'Poker', value: 'poker'})).addIntegerOption(o => o.setName('mise').setDescription('Mise').setRequired(true)))
    .addSubcommand(sub => sub.setName('balance').setDescription('Voir le solde'))
    .addSubcommand(sub => sub.setName('jackpot').setDescription('Voir le jackpot')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ff00ff').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'play') {
      const jeu = interaction.options.getString('jeu');
      const mise = interaction.options.getInteger('mise');
      const resultat = Math.random() > 0.5 ? 'Victoire! 🎉' : 'Défaite 😢';
      embed.setTitle('🎰 Résultat').setColor(resultat.includes('Victoire') ? '#00ff00' : '#ff0000').addFields(
        { name: 'Jeu', value: jeu, inline: true },
        { name: 'Mise', value: `$${mise}`, inline: true },
        { name: 'Résultat', value: resultat, inline: false }
      );
    } else if (sub === 'balance') {
      embed.setTitle('💰 Solde Casino').addFields(
        { name: 'Solde', value: '$50,000', inline: true },
        { name: 'Gains aujourd\'hui', value: '+$10,000', inline: true },
        { name: 'Pertes aujourd\'hui', value: '-$5,000', inline: true }
      );
    } else if (sub === 'jackpot') {
      embed.setTitle('🎁 Jackpot').addFields(
        { name: 'Jackpot actuel', value: '$1,000,000', inline: true },
        { name: 'Dernière victoire', value: 'Il y a 2 jours', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

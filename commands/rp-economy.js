import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-economy')
    .setDescription('Affiche les informations économiques')
    .addSubcommand(sub =>
      sub.setName('balance')
        .setDescription('Voir le solde')
        .addUserOption(opt => opt.setName('joueur').setDescription('Joueur').setRequired(false))
    )
    .addSubcommand(sub =>
      sub.setName('transfer')
        .setDescription('Transférer de l\'argent')
        .addUserOption(opt => opt.setName('destinataire').setDescription('Destinataire').setRequired(true))
        .addIntegerOption(opt => opt.setName('montant').setDescription('Montant').setRequired(true))
    )
    .addSubcommand(sub =>
      sub.setName('salary')
        .setDescription('Voir son salaire')
    )
    .addSubcommand(sub =>
      sub.setName('business')
        .setDescription('Voir ses entreprises')
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'balance') {
      const user = interaction.options.getUser('joueur') || interaction.user;
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('💰 Solde')
        .setDescription(`**${user.username}**`)
        .addFields(
          { name: '💵 Argent liquide', value: '$1,250,000', inline: true },
          { name: '🏦 Banque', value: '$5,000,000', inline: true },
          { name: '📊 Total', value: '$6,250,000', inline: false },
          { name: '💎 Crypto', value: '2.5 BTC', inline: true },
          { name: '🏠 Propriétés', value: '3', inline: true }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'transfer') {
      const dest = interaction.options.getUser('destinataire');
      const montant = interaction.options.getInteger('montant');
      
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('💸 Transfert d\'argent')
        .addFields(
          { name: 'De', value: interaction.user.username, inline: true },
          { name: 'À', value: dest.username, inline: true },
          { name: 'Montant', value: `$${montant.toLocaleString()}`, inline: false },
          { name: 'Statut', value: '✅ Transfert effectué' }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'salary') {
      const embed = new EmbedBuilder()
        .setColor('#ffaa00')
        .setTitle('💼 Salaire')
        .addFields(
          { name: 'Emploi', value: 'Avocat', inline: true },
          { name: 'Salaire/heure', value: '$150', inline: true },
          { name: 'Heures travaillées', value: '42h', inline: true },
          { name: 'Prochain paiement', value: 'Dans 2h', inline: true },
          { name: 'Salaire estimé', value: '$6,300', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
    
    else if (subcommand === 'business') {
      const embed = new EmbedBuilder()
        .setColor('#ff00ff')
        .setTitle('🏢 Entreprises')
        .addFields(
          { name: '🏪 Restaurant "Le Gourmet"', value: 'Revenu: $5,000/jour', inline: false },
          { name: '🏭 Usine textile', value: 'Revenu: $8,000/jour', inline: false },
          { name: '🎰 Casino', value: 'Revenu: $12,000/jour', inline: false },
          { name: '📊 Revenu total', value: '$25,000/jour', inline: false }
        )
        .setFooter({ text: 'Verlaine RP' })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};

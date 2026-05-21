import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-school')
    .setDescription('Système scolaire')
    .addSubcommand(sub => sub.setName('enroll').setDescription('S\'inscrire'))
    .addSubcommand(sub => sub.setName('grades').setDescription('Voir les notes'))
    .addSubcommand(sub => sub.setName('classes').setDescription('Voir les cours'))
    .addSubcommand(sub => sub.setName('diploma').setDescription('Voir les diplômes')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#0099ff').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'enroll') {
      embed.setTitle('✅ Inscription').setColor('#00ff00').addFields(
        { name: 'École', value: 'Université de Los Santos', inline: true },
        { name: 'Niveau', value: 'Licence', inline: true },
        { name: 'Statut', value: 'Inscrit', inline: false }
      );
    } else if (sub === 'grades') {
      embed.setTitle('📊 Notes').addFields(
        { name: 'Mathématiques', value: 'A (18/20)', inline: true },
        { name: 'Français', value: 'B (16/20)', inline: true },
        { name: 'Anglais', value: 'A (19/20)', inline: true },
        { name: 'Moyenne', value: '17.7/20', inline: false }
      );
    } else if (sub === 'classes') {
      embed.setTitle('📚 Cours').addFields(
        { name: 'Lundi 09:00', value: 'Mathématiques', inline: false },
        { name: 'Mardi 10:00', value: 'Français', inline: false },
        { name: 'Mercredi 14:00', value: 'Anglais', inline: false }
      );
    } else if (sub === 'diploma') {
      embed.setTitle('🎓 Diplômes').addFields(
        { name: 'Baccalauréat', value: '✅ Obtenu', inline: true },
        { name: 'Licence', value: '⏳ En cours', inline: true }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

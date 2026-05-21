import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rp-doctor')
    .setDescription('Commandes médecin')
    .addSubcommand(sub => sub.setName('patients').setDescription('Voir les patients'))
    .addSubcommand(sub => sub.setName('treat').setDescription('Soigner un patient').addUserOption(o => o.setName('patient').setDescription('Patient').setRequired(true)))
    .addSubcommand(sub => sub.setName('prescribe').setDescription('Prescrire un médicament').addUserOption(o => o.setName('patient').setDescription('Patient').setRequired(true)))
    .addSubcommand(sub => sub.setName('schedule').setDescription('Voir les rendez-vous')),
  
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor('#ff0000').setFooter({ text: 'Verlaine RP' }).setTimestamp();
    
    if (sub === 'patients') {
      embed.setTitle('🏥 Patients').addFields(
        { name: 'John Doe', value: 'Fracture - Chambre 101', inline: false },
        { name: 'Jane Smith', value: 'Grippe - Chambre 102', inline: false },
        { name: 'Mike Johnson', value: 'Blessure - Chambre 103', inline: false }
      );
    } else if (sub === 'treat') {
      const patient = interaction.options.getUser('patient');
      embed.setTitle('✅ Traitement').setColor('#00ff00').addFields({ name: 'Patient', value: patient.username, inline: true }, { name: 'Diagnostic', value: 'À déterminer', inline: true });
    } else if (sub === 'prescribe') {
      const patient = interaction.options.getUser('patient');
      embed.setTitle('✅ Ordonnance').setColor('#00ff00').addFields({ name: 'Patient', value: patient.username, inline: true }, { name: 'Médicament', value: 'À déterminer', inline: true });
    } else if (sub === 'schedule') {
      embed.setTitle('📅 Rendez-vous').addFields(
        { name: '10:00 - John Doe', value: 'Consultation', inline: false },
        { name: '11:30 - Jane Smith', value: 'Suivi', inline: false },
        { name: '14:00 - Mike Johnson', value: 'Urgence', inline: false }
      );
    }
    
    await interaction.reply({ embeds: [embed] });
  }
};

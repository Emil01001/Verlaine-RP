import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('recruitment-apply')
    .setDescription('Candidature pour rejoindre l\'équipe'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#ff6600')
      .setTitle('📋 Recrutement')
      .setDescription('Sélectionnez le poste pour lequel vous candidatez')
      .addFields(
        { name: '👨‍💻 Développeur', value: 'Créer des features et maintenir le code', inline: false },
        { name: '🛡️ Modérateur', value: 'Modérer le serveur et appliquer les règles', inline: false },
        { name: '🧪 Test', value: 'Tester les nouvelles features et signaler les bugs', inline: false },
        { name: '💬 Communication', value: 'Gérer les réseaux sociaux et la communauté', inline: false }
      )
      .setFooter({ text: 'Verlaine RP' })
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('recruitment_position')
          .setPlaceholder('Choisir un poste...')
          .addOptions(
            {
              label: '👨‍💻 Développeur',
              value: 'developer',
              description: 'Rejoindre l\'équipe dev'
            },
            {
              label: '🛡️ Modérateur',
              value: 'moderator',
              description: 'Devenir modérateur'
            },
            {
              label: '🧪 Test',
              value: 'tester',
              description: 'Rejoindre l\'équipe test'
            },
            {
              label: '💬 Communication',
              value: 'communication',
              description: 'Rejoindre l\'équipe communication'
            }
          )
      );

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  }
};

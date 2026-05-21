import { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export async function handleTicketButtons(client) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const buttonId = interaction.customId;

    // Support tickets
    if (buttonId.startsWith('ticket_')) {
      const category = buttonId.replace('ticket_', '');
      const questions = getTicketQuestions(category);
      
      await createTicket(interaction, category, questions);
    }

    // Recruitment tickets
    if (buttonId.startsWith('recruit_')) {
      const category = buttonId.replace('recruit_', '');
      const questions = getRecruitmentQuestions(category);
      
      await createRecruitmentTicket(interaction, category, questions);
    }

    // Close ticket
    if (buttonId === 'close_ticket') {
      await interaction.channel.delete();
    }
  });
}

async function createTicket(interaction, category, questions) {
  const guild = interaction.guild;
  const user = interaction.user;

  const channel = await guild.channels.create({
    name: `ticket-${user.username}`,
    type: ChannelType.GuildText,
    parent: '1504938519292940370', // Catégorie tickets
    permissionOverwrites: [
      {
        id: guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
      },
    ],
  });

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('🎫 Ticket Support')
    .setDescription(`Bienvenue ${user}!\n\nVoici les questions à remplir:\n\n${questions.join('\n')}`)
    .setFooter({ text: 'Verlaine RP - Support' })
    .setTimestamp();

  const closeButton = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('Fermer le ticket')
        .setStyle(ButtonStyle.Danger)
    );

  await channel.send({ embeds: [embed], components: [closeButton] });
  await interaction.reply({ content: `✅ Ticket créé: ${channel}`, ephemeral: true });
}

async function createRecruitmentTicket(interaction, category, questions) {
  const guild = interaction.guild;
  const user = interaction.user;

  const channel = await guild.channels.create({
    name: `recrutement-${user.username}`,
    type: ChannelType.GuildText,
    parent: '1504938519292940370', // Catégorie tickets
    permissionOverwrites: [
      {
        id: guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
      },
    ],
  });

  const embed = new EmbedBuilder()
    .setColor('#ff6600')
    .setTitle('👔 Candidature - ' + category)
    .setDescription(`Bienvenue ${user}!\n\nVoici les questions à remplir:\n\n${questions.join('\n')}`)
    .setFooter({ text: 'Verlaine RP - Recrutement' })
    .setTimestamp();

  const closeButton = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('Fermer le ticket')
        .setStyle(ButtonStyle.Danger)
    );

  await channel.send({ embeds: [embed], components: [closeButton] });
  await interaction.reply({ content: `✅ Candidature créée: ${channel}`, ephemeral: true });
}

function getTicketQuestions(category) {
  const questions = {
    admin: [
      '1️⃣ Quel est votre problème?',
      '2️⃣ Depuis quand rencontrez-vous ce problème?',
      '3️⃣ Avez-vous des preuves (screenshots, vidéos)?',
      '4️⃣ Avez-vous déjà contacté un modérateur?',
      '5️⃣ Informations supplémentaires?'
    ],
    partner: [
      '1️⃣ Nom de votre projet/entreprise?',
      '2️⃣ Quel type de partenariat recherchez-vous?',
      '3️⃣ Votre portfolio/site web?',
      '4️⃣ Vos compétences principales?',
      '5️⃣ Budget/propositions?'
    ],
    other: [
      '1️⃣ Sujet de votre demande?',
      '2️⃣ Description détaillée?',
      '3️⃣ Avez-vous des preuves?',
      '4️⃣ Urgence de la demande?',
      '5️⃣ Informations supplémentaires?'
    ]
  };
  return questions[category] || questions.other;
}

function getRecruitmentQuestions(category) {
  const questions = {
    mod: [
      '1️⃣ Quel est votre nom Roblox?',
      '2️⃣ Depuis combien de temps jouez-vous au RP?',
      '3️⃣ Pourquoi voulez-vous être modérateur?',
      '4️⃣ Avez-vous de l\'expérience en modération?',
      '5️⃣ Décrivez une situation où vous avez dû gérer un conflit.',
      '6️⃣ Avez-vous des références?'
    ],
    dev: [
      '1️⃣ Quel est votre nom Roblox?',
      '2️⃣ Quels sont vos langages de programmation?',
      '3️⃣ Avez-vous des projets antérieurs?',
      '4️⃣ Lien vers votre portfolio/GitHub?',
      '5️⃣ Quels services pouvez-vous offrir?',
      '6️⃣ Tarifs/propositions?'
    ],
    com: [
      '1️⃣ Quel est votre nom Roblox?',
      '2️⃣ Avez-vous de l\'expérience en communication?',
      '3️⃣ Pourquoi voulez-vous rejoindre l\'équipe communication?',
      '4️⃣ Quels réseaux sociaux maîtrisez-vous?',
      '5️⃣ Avez-vous des exemples de votre travail?',
      '6️⃣ Disponibilité hebdomadaire?'
    ]
  };
  return questions[category] || questions.mod;
}

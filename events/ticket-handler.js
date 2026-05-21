import { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export async function handleTicketButtons(client) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    try {
      const buttonId = interaction.customId;

      // Support ticket menus
      if (buttonId === 'ticket_admin_menu') {
        await showAdminForm(interaction);
        return;
      }
      if (buttonId === 'ticket_partner_menu') {
        await showPartnerForm(interaction);
        return;
      }
      if (buttonId === 'ticket_other_menu') {
        await showOtherForm(interaction);
        return;
      }

      // Recruitment menus
      if (buttonId === 'recruit_mod_menu') {
        await showModForm(interaction);
        return;
      }
      if (buttonId === 'recruit_dev_menu') {
        await showDevForm(interaction);
        return;
      }
      if (buttonId === 'recruit_com_menu') {
        await showComForm(interaction);
        return;
      }

      // Submit buttons
      if (buttonId.startsWith('submit_')) {
        const type = buttonId.replace('submit_', '');
        await createTicket(interaction, type);
        return;
      }

      // Close ticket
      if (buttonId === 'close_ticket') {
        await interaction.channel.delete();
        return;
      }
    } catch (error) {
      console.error('Erreur interaction:', error);
      if (!interaction.replied) {
        await interaction.reply({ content: '❌ Une erreur est survenue', ephemeral: true }).catch(() => {});
      }
    }
  });
}

async function showAdminForm(interaction) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Administration - Formulaire')
    .setDescription('**Questions à remplir:**\n\n1️⃣ Quel est votre problème?\n2️⃣ Depuis quand rencontrez-vous ce problème?\n3️⃣ Avez-vous des preuves (screenshots, vidéos)?\n4️⃣ Avez-vous déjà contacté un modérateur?\n5️⃣ Informations supplémentaires?')
    .setFooter({ text: 'Verlaine RP - Support' })
    .setTimestamp();

  const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('submit_admin')
        .setLabel('Créer le ticket')
        .setStyle(ButtonStyle.Success)
    );

  await interaction.reply({ embeds: [embed], components: [button], ephemeral: true });
}

async function showPartnerForm(interaction) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Partenariat Développement - Formulaire')
    .setDescription('**Questions à remplir:**\n\n1️⃣ Nom de votre projet/entreprise?\n2️⃣ Quel type de partenariat recherchez-vous?\n3️⃣ Votre portfolio/site web?\n4️⃣ Vos compétences principales?\n5️⃣ Budget/propositions?')
    .setFooter({ text: 'Verlaine RP - Support' })
    .setTimestamp();

  const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('submit_partner')
        .setLabel('Créer le ticket')
        .setStyle(ButtonStyle.Success)
    );

  await interaction.reply({ embeds: [embed], components: [button], ephemeral: true });
}

async function showOtherForm(interaction) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Ticket Autre - Formulaire')
    .setDescription('**Questions à remplir:**\n\n1️⃣ Sujet de votre demande?\n2️⃣ Description détaillée?\n3️⃣ Avez-vous des preuves?\n4️⃣ Urgence de la demande?\n5️⃣ Informations supplémentaires?')
    .setFooter({ text: 'Verlaine RP - Support' })
    .setTimestamp();

  const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('submit_other')
        .setLabel('Créer le ticket')
        .setStyle(ButtonStyle.Success)
    );

  await interaction.reply({ embeds: [embed], components: [button], ephemeral: true });
}

async function showModForm(interaction) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Modérateur Test - Formulaire')
    .setDescription('**Questions à remplir:**\n\n1️⃣ Quel est votre nom Roblox?\n2️⃣ Depuis combien de temps jouez-vous au RP?\n3️⃣ Pourquoi voulez-vous être modérateur?\n4️⃣ Avez-vous de l\'expérience en modération?\n5️⃣ Décrivez une situation où vous avez dû gérer un conflit.\n6️⃣ Avez-vous des références?')
    .setFooter({ text: 'Verlaine RP - Recrutement' })
    .setTimestamp();

  const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('submit_mod')
        .setLabel('Envoyer la candidature')
        .setStyle(ButtonStyle.Success)
    );

  await interaction.reply({ embeds: [embed], components: [button], ephemeral: true });
}

async function showDevForm(interaction) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Développeur - Formulaire')
    .setDescription('**Questions à remplir:**\n\n1️⃣ Quel est votre nom Roblox?\n2️⃣ Quels sont vos langages de programmation?\n3️⃣ Avez-vous des projets antérieurs?\n4️⃣ Lien vers votre portfolio/GitHub?\n5️⃣ Quels services pouvez-vous offrir?\n6️⃣ Tarifs/propositions?')
    .setFooter({ text: 'Verlaine RP - Recrutement' })
    .setTimestamp();

  const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('submit_dev')
        .setLabel('Envoyer la candidature')
        .setStyle(ButtonStyle.Success)
    );

  await interaction.reply({ embeds: [embed], components: [button], ephemeral: true });
}

async function showComForm(interaction) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Communication - Formulaire')
    .setDescription('**Questions à remplir:**\n\n1️⃣ Quel est votre nom Roblox?\n2️⃣ Avez-vous de l\'expérience en communication?\n3️⃣ Pourquoi voulez-vous rejoindre l\'équipe communication?\n4️⃣ Quels réseaux sociaux maîtrisez-vous?\n5️⃣ Avez-vous des exemples de votre travail?\n6️⃣ Disponibilité hebdomadaire?')
    .setFooter({ text: 'Verlaine RP - Recrutement' })
    .setTimestamp();

  const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('submit_com')
        .setLabel('Envoyer la candidature')
        .setStyle(ButtonStyle.Success)
    );

  await interaction.reply({ embeds: [embed], components: [button], ephemeral: true });
}

async function createTicket(interaction, type) {
  const guild = interaction.guild;
  const user = interaction.user;

  const ticketNames = {
    admin: 'support-admin',
    partner: 'support-partner',
    other: 'support-autre',
    mod: 'candidature-mod',
    dev: 'candidature-dev',
    com: 'candidature-com'
  };

  const channelName = `${ticketNames[type]}-${user.username}`;

  const channel = await guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    parent: '1504938519292940370',
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

  const questions = getQuestions(type);

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(getTitleForType(type))
    .setDescription(`Bienvenue ${user}!\n\n**Veuillez répondre aux questions suivantes:**\n\n${questions.join('\n')}`)
    .setFooter({ text: 'Verlaine RP' })
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

function getTitleForType(type) {
  const titles = {
    admin: 'Support - Administration',
    partner: 'Support - Partenariat Développement',
    other: 'Support - Autre',
    mod: 'Candidature - Modérateur Test',
    dev: 'Candidature - Développeur',
    com: 'Candidature - Communication'
  };
  return titles[type] || 'Ticket';
}

function getQuestions(type) {
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
    ],
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
  return questions[type] || [];
}

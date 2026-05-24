import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } from 'discord.js';

export async function handleTicketUltra(client) {
  client.on('interactionCreate', async (interaction) => {
    try {
      if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_ultra_select') {
        const value = interaction.values[0];
        
        if (value === 'ticket_admin_ultra') {
          await showAdminFormUltra(interaction);
        } else if (value === 'ticket_partner_ultra') {
          await showPartnerFormUltra(interaction);
        } else if (value === 'ticket_other_ultra') {
          await showOtherFormUltra(interaction);
        }
        return;
      }

      if (interaction.isButton()) {
        if (interaction.customId.startsWith('submit_ultra_')) {
          const type = interaction.customId.replace('submit_ultra_', '');
          await createTicketUltra(interaction, type);
          return;
        }

        if (interaction.customId === 'close_ticket_ultra') {
          const closeEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('🔒 Ticket Fermé')
            .setDescription(`Ticket fermé par ${interaction.user.username}\n\nMerci d'avoir contacté notre support!`)
            .setFooter({ text: 'Verlaine RP - Support' })
            .setTimestamp();

          await interaction.channel.send({ embeds: [closeEmbed] });
          setTimeout(() => interaction.channel.delete(), 3000);
          return;
        }
      }
    } catch (error) {
      console.error('Erreur ticket ultra:', error);
    }
  });
}

async function showAdminFormUltra(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });
    await new Promise(r => setTimeout(r, 500));

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('📋 Formulaire - Administration')
      .setDescription('**Veuillez répondre aux questions suivantes:**\n\n1️⃣ **Quel est le problème rencontré?**\n   (Description détaillée du bug/erreur)\n\n2️⃣ **Depuis quand ce problème existe-t-il?**\n   (Date/heure approximative)\n\n3️⃣ **Avez-vous des preuves?**\n   (Screenshots, vidéos, logs)\n\n4️⃣ **Avez-vous déjà contacté un modérateur?**\n   (Oui/Non)\n\n5️⃣ **Informations supplémentaires**\n   (Contexte additionnel)')
      .setFooter({ text: 'Verlaine RP - Formulaire Administration' })
      .setTimestamp();

    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('submit_ultra_admin')
          .setLabel('✅ Créer le Ticket')
          .setStyle(ButtonStyle.Success)
      );

    await interaction.editReply({ embeds: [embed], components: [button] });
  } catch (error) {
    console.error('Erreur showAdminFormUltra:', error);
  }
}

async function showPartnerFormUltra(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });
    await new Promise(r => setTimeout(r, 500));

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🤝 Formulaire - Partenariat Développement')
      .setDescription('**Veuillez répondre aux questions suivantes:**\n\n1️⃣ **Nom de votre projet/entreprise?**\n   (Identité de votre structure)\n\n2️⃣ **Quel type de partenariat recherchez-vous?**\n   (Développement, sponsoring, collaboration)\n\n3️⃣ **Votre portfolio/site web?**\n   (Lien vers vos travaux)\n\n4️⃣ **Vos compétences principales?**\n   (Langages, domaines d\'expertise)\n\n5️⃣ **Budget/propositions?**\n   (Tarifs et conditions)')
      .setFooter({ text: 'Verlaine RP - Formulaire Partenariat' })
      .setTimestamp();

    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('submit_ultra_partner')
          .setLabel('✅ Créer le Ticket')
          .setStyle(ButtonStyle.Success)
      );

    await interaction.editReply({ embeds: [embed], components: [button] });
  } catch (error) {
    console.error('Erreur showPartnerFormUltra:', error);
  }
}

async function showOtherFormUltra(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });
    await new Promise(r => setTimeout(r, 500));

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('❓ Formulaire - Autre Demande')
      .setDescription('**Veuillez répondre aux questions suivantes:**\n\n1️⃣ **Sujet de votre demande?**\n   (Titre principal)\n\n2️⃣ **Description détaillée?**\n   (Explications complètes)\n\n3️⃣ **Avez-vous des preuves/documents?**\n   (Screenshots, fichiers)\n\n4️⃣ **Urgence de la demande?**\n   (Basse/Moyenne/Haute)\n\n5️⃣ **Informations supplémentaires?**\n   (Contexte additionnel)')
      .setFooter({ text: 'Verlaine RP - Formulaire Autre' })
      .setTimestamp();

    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('submit_ultra_other')
          .setLabel('✅ Créer le Ticket')
          .setStyle(ButtonStyle.Success)
      );

    await interaction.editReply({ embeds: [embed], components: [button] });
  } catch (error) {
    console.error('Erreur showOtherFormUltra:', error);
  }
}

async function createTicketUltra(interaction, type) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;
    const ticketNumber = Math.floor(Math.random() * 10000);
    const channelName = `ticket-${type}-${ticketNumber}`;

    const ticketChannel = await guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      parent: null,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: ['ViewChannel']
        },
        {
          id: interaction.user.id,
          allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
        }
      ]
    });

    const typeLabel = {
      'admin': '📋 Administration',
      'partner': '🤝 Partenariat',
      'other': '❓ Autre'
    }[type] || type;

    const ticketEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle(`🎟️ Ticket #${ticketNumber}`)
      .setDescription(`**Type:** ${typeLabel}\n**Utilisateur:** ${interaction.user.username}\n**Date:** ${new Date().toLocaleString('fr-FR')}\n\n━━━━━━━━━━━━━━━━━━━━━━\n\n**Bienvenue dans votre ticket!**\n\nNous avons bien reçu votre demande. Notre équipe va l'examiner et vous répondre dans les plus brefs délais.\n\nMerci de votre patience!`)
      .setFooter({ text: 'Verlaine RP - Support Premium' })
      .setTimestamp();

    const closeButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('close_ticket_ultra')
          .setLabel('🔒 Fermer le Ticket')
          .setStyle(ButtonStyle.Danger)
      );

    await ticketChannel.send({ embeds: [ticketEmbed], components: [closeButton] });

    const confirmEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('✅ Ticket Créé!')
      .setDescription(`Votre ticket a été créé avec succès!\n\n📍 **Canal:** ${ticketChannel}\n🎟️ **ID:** #${ticketNumber}`)
      .setFooter({ text: 'Verlaine RP - Support' })
      .setTimestamp();

    await interaction.editReply({ embeds: [confirmEmbed] });

    // Notification au staff
    const staffEmbed = new EmbedBuilder()
      .setColor('#ffff00')
      .setTitle(`🔔 Nouveau Ticket: ${typeLabel}`)
      .setDescription(`**Utilisateur:** ${interaction.user.username}\n**ID:** #${ticketNumber}\n**Type:** ${typeLabel}\n**Créé:** ${new Date().toLocaleString('fr-FR')}`)
      .setFooter({ text: 'Verlaine RP - Notification Staff' })
      .setTimestamp();

    // Envoyer la notification dans le canal du ticket
    await ticketChannel.send({ embeds: [staffEmbed] });

  } catch (error) {
    console.error('Erreur createTicketUltra:', error);
    await interaction.editReply({ content: '❌ Erreur lors de la création du ticket', ephemeral: true });
  }
}

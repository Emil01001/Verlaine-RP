import { EmbedBuilder } from 'discord.js';

export async function handleNotificationMenu(client) {
  client.on('interactionCreate', async (interaction) => {
    try {
      if (!interaction.isStringSelectMenu() || interaction.customId !== 'notif_select') return;

      await interaction.deferReply({ ephemeral: true });

      const notifMap = {
        'notif_journal': 'Notifications Journal',
        'notif_sondage': 'Notifications Sondages',
        'notif_annonces': 'Notifications Annonces',
        'notif_reseaux': 'Notifications Réseaux',
        'notif_updates': 'Notifications Updates',
        'notif_evenement': 'Notifications Événementiel',
        'notif_spoils': 'Notifications Spoils'
      };

      const selectedValues = interaction.values;
      const member = interaction.member;
      const guild = interaction.guild;

      let addedNotifs = [];
      let removedNotifs = [];

      // Ajouter les notifications sélectionnées
      for (const value of selectedValues) {
        const notifName = notifMap[value];
        let role = guild.roles.cache.find(r => r.name === notifName);

        if (!role) {
          role = await guild.roles.create({
            name: notifName,
            reason: 'Rôle de notification auto-attribué'
          });
        }

        if (!member.roles.cache.has(role.id)) {
          await member.roles.add(role);
          addedNotifs.push(notifName);
        }
      }

      // Retirer les notifications non sélectionnées
      for (const [key, notifName] of Object.entries(notifMap)) {
        if (!selectedValues.includes(key)) {
          const role = guild.roles.cache.find(r => r.name === notifName);
          if (role && member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
            removedNotifs.push(notifName);
          }
        }
      }

      // Créer l'embed de confirmation
      const confirmEmbed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Notifications Mises à Jour')
        .setDescription('Vos préférences de notifications ont été mises à jour!')
        .addFields(
          { name: '➕ Notifications Activées', value: addedNotifs.length > 0 ? addedNotifs.map(n => `• ${n}`).join('\n') : 'Aucune', inline: true },
          { name: '➖ Notifications Désactivées', value: removedNotifs.length > 0 ? removedNotifs.map(n => `• ${n}`).join('\n') : 'Aucune', inline: true }
        )
        .setFooter({ text: 'Verlaine RP - Notifications' })
        .setTimestamp();

      await interaction.editReply({ embeds: [confirmEmbed] });

      // Notification dans le canal de logs
      const notifChannel = guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (notifChannel) {
        const logEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('🔔 Mise à Jour des Notifications')
          .setDescription(`${member.user.username} a mis à jour ses préférences de notifications`)
          .addFields(
            { name: '👤 Utilisateur', value: `${member.user.username} (${member.id})`, inline: true },
            { name: '➕ Activées', value: addedNotifs.length > 0 ? addedNotifs.map(n => `• ${n}`).join('\n') : 'Aucune', inline: false },
            { name: '➖ Désactivées', value: removedNotifs.length > 0 ? removedNotifs.map(n => `• ${n}`).join('\n') : 'Aucune', inline: false },
            { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
          )
          .setThumbnail(member.user.displayAvatarURL({ size: 512, dynamic: true }))
          .setFooter({ text: 'Verlaine RP - Logs' })
          .setTimestamp();

        await notifChannel.send({ embeds: [logEmbed] });
      }

    } catch (error) {
      console.error('Erreur notification handler:', error);
      try {
        await interaction.editReply({ content: '❌ Une erreur est survenue', ephemeral: true });
      } catch (e) {
        console.error('Erreur reply:', e);
      }
    }
  });
}

// Commandes pour envoyer les notifications
export async function sendJournalNotif(guild, title, content) {
  try {
    const channel = guild.channels.cache.find(ch => ch.name === 'journal' || ch.name === 'actualités');
    const role = guild.roles.cache.find(r => r.name === 'Notifications Journal');
    
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`📰 ${title}`)
      .setDescription(content)
      .setFooter({ text: 'Verlaine RP - Journal' })
      .setTimestamp();

    await channel.send({ 
      content: role ? `${role}` : '',
      embeds: [embed] 
    });
  } catch (error) {
    console.error('Erreur envoi journal:', error);
  }
}

export async function sendPollNotif(guild, title, options) {
  try {
    const channel = guild.channels.cache.find(ch => ch.name === 'sondages' || ch.name === 'polls');
    const role = guild.roles.cache.find(r => r.name === 'Notifications Sondages');
    
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#ffff00')
      .setTitle(`📊 ${title}`)
      .setDescription(options.map((opt, i) => `${i + 1}️⃣ ${opt}`).join('\n'))
      .setFooter({ text: 'Verlaine RP - Sondage' })
      .setTimestamp();

    await channel.send({ 
      content: role ? `${role}` : '',
      embeds: [embed] 
    });
  } catch (error) {
    console.error('Erreur envoi sondage:', error);
  }
}

export async function sendAnnouncementNotif(guild, title, content) {
  try {
    const channel = guild.channels.cache.find(ch => ch.name === 'annonces' || ch.name === 'announcements');
    const role = guild.roles.cache.find(r => r.name === 'Notifications Annonces');
    
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle(`📢 ${title}`)
      .setDescription(content)
      .setFooter({ text: 'Verlaine RP - Annonce Importante' })
      .setTimestamp();

    await channel.send({ 
      content: role ? `${role}` : '',
      embeds: [embed] 
    });
  } catch (error) {
    console.error('Erreur envoi annonce:', error);
  }
}

export async function sendSocialNotif(guild, platform, content) {
  try {
    const channel = guild.channels.cache.find(ch => ch.name === 'réseaux' || ch.name === 'socials');
    const role = guild.roles.cache.find(r => r.name === 'Notifications Réseaux');
    
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#1DA1F2')
      .setTitle(`🌐 ${platform}`)
      .setDescription(content)
      .setFooter({ text: 'Verlaine RP - Réseaux Sociaux' })
      .setTimestamp();

    await channel.send({ 
      content: role ? `${role}` : '',
      embeds: [embed] 
    });
  } catch (error) {
    console.error('Erreur envoi réseaux:', error);
  }
}

export async function sendUpdateNotif(guild, version, changes) {
  try {
    const channel = guild.channels.cache.find(ch => ch.name === 'updates' || ch.name === 'mises-à-jour');
    const role = guild.roles.cache.find(r => r.name === 'Notifications Updates');
    
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle(`🔄 Mise à Jour v${version}`)
      .setDescription(changes)
      .setFooter({ text: 'Verlaine RP - Updates' })
      .setTimestamp();

    await channel.send({ 
      content: role ? `${role}` : '',
      embeds: [embed] 
    });
  } catch (error) {
    console.error('Erreur envoi update:', error);
  }
}

export async function sendEventNotif(guild, eventName, details) {
  try {
    const channel = guild.channels.cache.find(ch => ch.name === 'événements' || ch.name === 'events');
    const role = guild.roles.cache.find(r => r.name === 'Notifications Événementiel');
    
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#ff00ff')
      .setTitle(`🎉 ${eventName}`)
      .setDescription(details)
      .setFooter({ text: 'Verlaine RP - Événement' })
      .setTimestamp();

    await channel.send({ 
      content: role ? `${role}` : '',
      embeds: [embed] 
    });
  } catch (error) {
    console.error('Erreur envoi événement:', error);
  }
}

export async function sendSpoilNotif(guild, content, spoilContent) {
  try {
    const channel = guild.channels.cache.find(ch => ch.name === 'spoils' || ch.name === 'spoilers');
    const role = guild.roles.cache.find(r => r.name === 'Notifications Spoils');
    
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#000000')
      .setTitle(`⚠️ ATTENTION: SPOILER`)
      .setDescription(`${content}\n\n||${spoilContent}||`)
      .setFooter({ text: 'Verlaine RP - Spoiler Warning' })
      .setTimestamp();

    await channel.send({ 
      content: role ? `${role}` : '',
      embeds: [embed] 
    });
  } catch (error) {
    console.error('Erreur envoi spoil:', error);
  }
}

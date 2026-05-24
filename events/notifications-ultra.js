import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export async function handleNotificationsUltra(client) {
  // Notification de rôle ajouté
  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    try {
      const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
      const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

      // Rôle ajouté
      if (addedRoles.size > 0) {
        const notifChannel = newMember.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
        if (notifChannel) {
          addedRoles.forEach(role => {
            const roleEmbed = new EmbedBuilder()
              .setColor('#00ff00')
              .setTitle('🎖️ Rôle Ajouté')
              .setDescription(`${newMember.user.username} a reçu le rôle ${role}`)
              .addFields(
                { name: '👤 Utilisateur', value: `${newMember.user.username} (${newMember.id})`, inline: true },
                { name: '🎖️ Rôle', value: `${role.name} (${role.id})`, inline: true },
                { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
              )
              .setThumbnail(newMember.user.displayAvatarURL({ size: 512, dynamic: true }))
              .setFooter({ text: 'Verlaine RP - Notifications' })
              .setTimestamp();

            notifChannel.send({ embeds: [roleEmbed] });
          });
        }
      }

      // Rôle retiré
      if (removedRoles.size > 0) {
        const notifChannel = newMember.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
        if (notifChannel) {
          removedRoles.forEach(role => {
            const roleEmbed = new EmbedBuilder()
              .setColor('#ff0000')
              .setTitle('🗑️ Rôle Retiré')
              .setDescription(`${newMember.user.username} a perdu le rôle ${role}`)
              .addFields(
                { name: '👤 Utilisateur', value: `${newMember.user.username} (${newMember.id})`, inline: true },
                { name: '🎖️ Rôle', value: `${role.name} (${role.id})`, inline: true },
                { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
              )
              .setThumbnail(newMember.user.displayAvatarURL({ size: 512, dynamic: true }))
              .setFooter({ text: 'Verlaine RP - Notifications' })
              .setTimestamp();

            notifChannel.send({ embeds: [roleEmbed] });
          });
        }
      }
    } catch (error) {
      console.error('Erreur notification rôle:', error);
    }
  });

  // Notification de ban
  client.on('guildBanAdd', async (ban) => {
    try {
      const notifChannel = ban.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (!notifChannel) return;

      const banEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('🚫 Utilisateur Banni')
        .setDescription(`${ban.user.username} a été banni du serveur`)
        .addFields(
          { name: '👤 Utilisateur', value: `${ban.user.username} (${ban.user.id})`, inline: true },
          { name: '📝 Raison', value: ban.reason || 'Aucune raison spécifiée', inline: false },
          { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
        )
        .setThumbnail(ban.user.displayAvatarURL({ size: 512, dynamic: true }))
        .setFooter({ text: 'Verlaine RP - Modération' })
        .setTimestamp();

      await notifChannel.send({ embeds: [banEmbed] });
    } catch (error) {
      console.error('Erreur notification ban:', error);
    }
  });

  // Notification de débannissement
  client.on('guildBanRemove', async (ban) => {
    try {
      const notifChannel = ban.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (!notifChannel) return;

      const unbanEmbed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Utilisateur Débanni')
        .setDescription(`${ban.user.username} a été débanni du serveur`)
        .addFields(
          { name: '👤 Utilisateur', value: `${ban.user.username} (${ban.user.id})`, inline: true },
          { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
        )
        .setThumbnail(ban.user.displayAvatarURL({ size: 512, dynamic: true }))
        .setFooter({ text: 'Verlaine RP - Modération' })
        .setTimestamp();

      await notifChannel.send({ embeds: [unbanEmbed] });
    } catch (error) {
      console.error('Erreur notification unban:', error);
    }
  });

  // Notification de kick
  client.on('guildMemberRemove', async (member) => {
    try {
      const notifChannel = member.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (!notifChannel) return;

      const kickEmbed = new EmbedBuilder()
        .setColor('#ff6600')
        .setTitle('⚠️ Utilisateur Expulsé')
        .setDescription(`${member.user.username} a quitté ou a été expulsé du serveur`)
        .addFields(
          { name: '👤 Utilisateur', value: `${member.user.username} (${member.id})`, inline: true },
          { name: '📊 Membres restants', value: `${member.guild.memberCount}`, inline: true },
          { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
        )
        .setThumbnail(member.user.displayAvatarURL({ size: 512, dynamic: true }))
        .setFooter({ text: 'Verlaine RP - Modération' })
        .setTimestamp();

      await notifChannel.send({ embeds: [kickEmbed] });
    } catch (error) {
      console.error('Erreur notification kick:', error);
    }
  });

  // Notification de message supprimé
  client.on('messageDelete', async (message) => {
    try {
      if (message.author.bot) return;

      const notifChannel = message.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (!notifChannel) return;

      const deleteEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('🗑️ Message Supprimé')
        .setDescription(`Un message de ${message.author.username} a été supprimé`)
        .addFields(
          { name: '👤 Auteur', value: `${message.author.username} (${message.author.id})`, inline: true },
          { name: '📍 Canal', value: `${message.channel.name}`, inline: true },
          { name: '💬 Contenu', value: message.content.substring(0, 1024) || '*Contenu vide*', inline: false },
          { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
        )
        .setThumbnail(message.author.displayAvatarURL({ size: 512, dynamic: true }))
        .setFooter({ text: 'Verlaine RP - Logs' })
        .setTimestamp();

      await notifChannel.send({ embeds: [deleteEmbed] });
    } catch (error) {
      console.error('Erreur notification suppression:', error);
    }
  });

  // Notification de message modifié
  client.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
      if (newMessage.author.bot) return;
      if (oldMessage.content === newMessage.content) return;

      const notifChannel = newMessage.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (!notifChannel) return;

      const editEmbed = new EmbedBuilder()
        .setColor('#ffff00')
        .setTitle('✏️ Message Modifié')
        .setDescription(`Un message de ${newMessage.author.username} a été modifié`)
        .addFields(
          { name: '👤 Auteur', value: `${newMessage.author.username} (${newMessage.author.id})`, inline: true },
          { name: '📍 Canal', value: `${newMessage.channel.name}`, inline: true },
          { name: '📝 Ancien contenu', value: oldMessage.content.substring(0, 512) || '*Contenu vide*', inline: false },
          { name: '📝 Nouveau contenu', value: newMessage.content.substring(0, 512) || '*Contenu vide*', inline: false },
          { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
        )
        .setThumbnail(newMessage.author.displayAvatarURL({ size: 512, dynamic: true }))
        .setFooter({ text: 'Verlaine RP - Logs' })
        .setTimestamp();

      await notifChannel.send({ embeds: [editEmbed] });
    } catch (error) {
      console.error('Erreur notification modification:', error);
    }
  });

  // Notification de changement de nom
  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    try {
      if (oldMember.nickname === newMember.nickname) return;

      const notifChannel = newMember.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (!notifChannel) return;

      const nicknameEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('📝 Pseudo Changé')
        .setDescription(`${newMember.user.username} a changé son pseudo`)
        .addFields(
          { name: '👤 Utilisateur', value: `${newMember.user.username} (${newMember.id})`, inline: true },
          { name: '📝 Ancien pseudo', value: oldMember.nickname || 'Aucun', inline: true },
          { name: '📝 Nouveau pseudo', value: newMember.nickname || 'Aucun', inline: true },
          { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
        )
        .setThumbnail(newMember.user.displayAvatarURL({ size: 512, dynamic: true }))
        .setFooter({ text: 'Verlaine RP - Logs' })
        .setTimestamp();

      await notifChannel.send({ embeds: [nicknameEmbed] });
    } catch (error) {
      console.error('Erreur notification pseudo:', error);
    }
  });

  // Notification de nouveau canal
  client.on('channelCreate', async (channel) => {
    try {
      const notifChannel = channel.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (!notifChannel) return;

      const channelEmbed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('➕ Nouveau Canal')
        .setDescription(`Un nouveau canal a été créé`)
        .addFields(
          { name: '📍 Nom', value: `${channel.name}`, inline: true },
          { name: '🏷️ Type', value: `${channel.type}`, inline: true },
          { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
        )
        .setFooter({ text: 'Verlaine RP - Logs' })
        .setTimestamp();

      await notifChannel.send({ embeds: [channelEmbed] });
    } catch (error) {
      console.error('Erreur notification canal:', error);
    }
  });

  // Notification de suppression de canal
  client.on('channelDelete', async (channel) => {
    try {
      const notifChannel = channel.guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (!notifChannel) return;

      const deleteChannelEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('🗑️ Canal Supprimé')
        .setDescription(`Un canal a été supprimé`)
        .addFields(
          { name: '📍 Nom', value: `${channel.name}`, inline: true },
          { name: '🏷️ Type', value: `${channel.type}`, inline: true },
          { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
        )
        .setFooter({ text: 'Verlaine RP - Logs' })
        .setTimestamp();

      await notifChannel.send({ embeds: [deleteChannelEmbed] });
    } catch (error) {
      console.error('Erreur notification suppression canal:', error);
    }
  });
}

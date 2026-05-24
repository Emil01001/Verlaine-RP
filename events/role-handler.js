import { EmbedBuilder } from 'discord.js';

export async function handleRoleMenu(client) {
  client.on('interactionCreate', async (interaction) => {
    try {
      if (!interaction.isStringSelectMenu() || interaction.customId !== 'role_select') return;

      await interaction.deferReply({ ephemeral: true });

      const roleMap = {
        'role_notif_annonces': 'Notifications Annonces',
        'role_notif_events': 'Notifications Événements',
        'role_notif_updates': 'Notifications Mises à Jour',
        'role_interest_rp': 'Intéressé par le RP',
        'role_interest_dev': 'Intéressé par le Développement',
        'role_boost_notif': 'Notifications de Boost'
      };

      const selectedValues = interaction.values;
      const member = interaction.member;
      const guild = interaction.guild;

      let addedRoles = [];
      let removedRoles = [];

      // Ajouter les rôles sélectionnés
      for (const value of selectedValues) {
        const roleName = roleMap[value];
        let role = guild.roles.cache.find(r => r.name === roleName);

        if (!role) {
          role = await guild.roles.create({
            name: roleName,
            reason: 'Rôle auto-attribué'
          });
        }

        if (!member.roles.cache.has(role.id)) {
          await member.roles.add(role);
          addedRoles.push(role.name);
        }
      }

      // Retirer les rôles non sélectionnés
      for (const [key, roleName] of Object.entries(roleMap)) {
        if (!selectedValues.includes(key)) {
          const role = guild.roles.cache.find(r => r.name === roleName);
          if (role && member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
            removedRoles.push(role.name);
          }
        }
      }

      // Créer l'embed de confirmation
      const confirmEmbed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Rôles Mis à Jour')
        .setDescription('Vos rôles ont été mis à jour avec succès!')
        .addFields(
          { name: '➕ Rôles Ajoutés', value: addedRoles.length > 0 ? addedRoles.join('\n') : 'Aucun', inline: true },
          { name: '➖ Rôles Retirés', value: removedRoles.length > 0 ? removedRoles.join('\n') : 'Aucun', inline: true }
        )
        .setFooter({ text: 'Verlaine RP - Rôles' })
        .setTimestamp();

      await interaction.editReply({ embeds: [confirmEmbed] });

      // Notification dans le canal de logs
      const notifChannel = guild.channels.cache.find(ch => ch.name === 'notifications' || ch.name === 'logs');
      if (notifChannel) {
        const logEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('🎖️ Mise à Jour des Rôles')
          .setDescription(`${member.user.username} a mis à jour ses rôles`)
          .addFields(
            { name: '👤 Utilisateur', value: `${member.user.username} (${member.id})`, inline: true },
            { name: '➕ Rôles Ajoutés', value: addedRoles.length > 0 ? addedRoles.join(', ') : 'Aucun', inline: false },
            { name: '➖ Rôles Retirés', value: removedRoles.length > 0 ? removedRoles.join(', ') : 'Aucun', inline: false },
            { name: '⏰ Date', value: new Date().toLocaleString('fr-FR'), inline: false }
          )
          .setThumbnail(member.user.displayAvatarURL({ size: 512, dynamic: true }))
          .setFooter({ text: 'Verlaine RP - Logs' })
          .setTimestamp();

        await notifChannel.send({ embeds: [logEmbed] });
      }

    } catch (error) {
      console.error('Erreur role handler:', error);
      try {
        await interaction.editReply({ content: '❌ Une erreur est survenue', ephemeral: true });
      } catch (e) {
        console.error('Erreur reply:', e);
      }
    }
  });
}

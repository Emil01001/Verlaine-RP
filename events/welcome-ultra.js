import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export async function handleWelcomeUltra(client) {
  client.on('guildMemberAdd', async (member) => {
    try {
      // Récupérer le canal de bienvenue (à configurer)
      const welcomeChannel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue' || ch.name === 'welcome');
      if (!welcomeChannel) return;

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('🎉 Bienvenue à toi!')
        .setDescription(`Salut ${member.user.username}! 👋\n\nBienvenue sur le serveur de **Verlaine Roleplay**!\n\nNous sommes ravis de t'accueillir dans notre communauté. Prépare-toi pour une expérience de roleplay inoubliable!`)
        .addFields(
          { name: '📚 Avant de commencer', value: 'Consulte les <#1504938519292940370> pour connaître les règles et bien démarrer.' },
          { name: '❓ Des questions?', value: 'La catégorie <#1504953491041419404> est à ta disposition pour t\'aider!' },
          { name: '📰 Reste informé', value: 'Consulte <#1504949036086591518> pour les dernières actualités du serveur.' },
          { name: '🎮 Prêt à jouer?', value: 'Rejoins-nous et amuse-toi bien! Bienvenue dans la famille Verlaine RP!' }
        )
        .setThumbnail(member.user.displayAvatarURL({ size: 512, dynamic: true }))
        .setFooter({ text: `Membre #${member.guild.memberCount}` })
        .setTimestamp();

      const buttons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('📖 Règles')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/channels/1504930010417467535/1504938519292940370'),
          new ButtonBuilder()
            .setLabel('❓ Support')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/channels/1504930010417467535/1504953491041419404'),
          new ButtonBuilder()
            .setLabel('📰 Actualités')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/channels/1504930010417467535/1504949036086591518')
        );

      await welcomeChannel.send({ content: `${member}`, embeds: [embed], components: [buttons] });

      // Message privé de bienvenue
      const dmEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('👋 Bienvenue sur Verlaine RP!')
        .setDescription('Nous sommes heureux de t\'accueillir dans notre communauté de roleplay!')
        .addFields(
          { name: '🎮 Qu\'est-ce que Verlaine RP?', value: 'Un serveur de roleplay immersif basé sur GTA V avec une économie complète, des métiers, et une communauté active.' },
          { name: '🚀 Comment commencer?', value: '1. Lis les règles\n2. Crée ton personnage\n3. Rejoins-nous en jeu\n4. Amuse-toi!' },
          { name: '💬 Besoin d\'aide?', value: 'N\'hésite pas à contacter notre équipe de support via un ticket!' }
        )
        .setThumbnail(member.guild.iconURL({ size: 512, dynamic: true }))
        .setFooter({ text: 'Verlaine RP - Équipe de Bienvenue' })
        .setTimestamp();

      await member.send({ embeds: [dmEmbed] }).catch(() => {
        console.log(`Impossible d'envoyer un MP à ${member.user.username}`);
      });

    } catch (error) {
      console.error('Erreur welcome ultra:', error);
    }
  });
}

export async function handleBoostUltra(client) {
  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    try {
      const hadBoost = oldMember.premiumSinceTimestamp;
      const hasBoost = newMember.premiumSinceTimestamp;

      if (!hadBoost && hasBoost) {
        const boostChannel = newMember.guild.channels.cache.find(ch => ch.name === 'annonces' || ch.name === 'announcements');
        if (!boostChannel) return;

        const boostEmbed = new EmbedBuilder()
          .setColor('#ff00ff')
          .setTitle('⭐ Merci pour le Boost!')
          .setDescription(`Merci ${newMember.user.username} d'avoir boosté **Verlaine Roleplay**! 🗼\n\nGrâce à toi, le serveur grandit encore plus!\n\n**Avantages du boost:**\n• Qualité audio/vidéo améliorée\n• Plus de canaux personnalisés\n• Émojis personnalisés\n• Et bien plus encore!`)
          .setThumbnail(newMember.user.displayAvatarURL({ size: 512, dynamic: true }))
          .setFooter({ text: 'Verlaine RP - Merci!' })
          .setTimestamp();

        await boostChannel.send({ embeds: [boostEmbed] });
      }
    } catch (error) {
      console.error('Erreur boost ultra:', error);
    }
  });
}

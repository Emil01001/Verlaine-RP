import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Vérifie la connexion du bot'),
  
  async execute(interaction) {
    const latency = Math.round(interaction.client.ws.ping);
    
    await interaction.reply({
      content: `🏓 Pong! Latence: ${latency}ms`,
      ephemeral: true
    });
  }
};

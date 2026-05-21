import { Client, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Variables d'environnement
const TOKEN = process.env.DISCORD_BOT_TOKEN || 'MTUwNDkzNTU3NDY2OTM2NTQ2Mw.GWbuY-.kHpIGwa6R129RDyn0Md1ytu8WCm_HdAgncseRM';
const GUILD_ID = process.env.DISCORD_GUILD_ID || '1505517985715195924';
const APP_ID = process.env.VITE_APP_ID || '1504935574669365463';

console.log('🚀 Démarrage du bot Verlaine RP...');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// Charger les commandes
async function loadCommands() {
  const commandsPath = path.join(__dirname, 'commands');
  
  if (!fs.existsSync(commandsPath)) {
    console.log('📂 Dossier commands créé');
    fs.mkdirSync(commandsPath, { recursive: true });
    return 0;
  }

  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  console.log(`📂 Chargement de ${commandFiles.length} commandes...`);

  let loaded = 0;
  for (const file of commandFiles) {
    try {
      const filePath = path.join(commandsPath, file);
      const command = await import(`file://${filePath}`);
      
      if (command.default?.data?.name) {
        client.commands.set(command.default.data.name, command.default);
        console.log(`  ✅ ${command.default.data.name}`);
        loaded++;
      }
    } catch (error) {
      console.error(`  ❌ ${file}:`, error.message);
    }
  }

  console.log(`✅ ${loaded} commandes chargées\n`);
  return loaded;
}

// Enregistrer les commandes
async function registerCommands() {
  try {
    const commands = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());
    
    if (commands.length === 0) {
      console.log('⚠️ Aucune commande à enregistrer');
      return;
    }

    console.log(`📝 Enregistrement de ${commands.length} commandes...`);
    
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    
    await rest.put(
      Routes.applicationGuildCommands(APP_ID, GUILD_ID),
      { body: commands }
    );

    console.log(`✅ ${commands.length} commandes enregistrées!\n`);
  } catch (error) {
    console.error('❌ Erreur enregistrement:', error.message);
  }
}

// Événements
client.on('ready', () => {
  console.log(`✅ BOT CONNECTÉ: ${client.user.tag}`);
  console.log(`📊 Serveur: ${GUILD_ID}`);
  console.log(`🎮 Statut: En ligne\n`);
  
  client.user.setActivity('Verlaine Rôleplay', { type: 'WATCHING' });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  
  if (!command) {
    console.warn(`⚠️ Commande inconnue: ${interaction.commandName}`);
    return;
  }

  try {
    console.log(`📌 ${interaction.user.username} → /${interaction.commandName}`);
    await command.execute(interaction);
  } catch (error) {
    console.error(`❌ Erreur: ${interaction.commandName}`, error);
    
    const errorEmbed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('❌ Erreur')
      .setDescription('Une erreur est survenue.')
      .setFooter({ text: 'Verlaine RP' });

    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
      } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    } catch (e) {
      console.error('Erreur réponse:', e);
    }
  }
});

// Démarrage
(async () => {
  try {
    await loadCommands();
    await registerCommands();
    await client.login(TOKEN);
  } catch (error) {
    console.error('❌ Erreur démarrage:', error);
    process.exit(1);
  }
})();

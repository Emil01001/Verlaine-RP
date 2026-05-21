# 🎮 Verlaine Roleplay - Discord Bot

Bot Discord complet pour le serveur **Verlaine Roleplay** avec **32 commandes RP détaillées**.

## 📋 Commandes disponibles

### 💰 Économie
- `/rp-economy` - Gestion de l'économie (balance, transfer, salary, business)
- `/rp-bank` - Gestion bancaire (balance, deposit, withdraw, transfer)
- `/rp-crypto` - Trading de crypto-monnaies (market, buy, sell, portfolio)

### 💼 Métiers
- `/rp-job` - Gestion des métiers (list, apply, salary, work)
- `/rp-police` - Commandes police (dispatch, arrest, fine, wanted)
- `/rp-doctor` - Commandes médecin (patients, treat, prescribe, schedule)
- `/rp-lawyer` - Commandes avocat (cases, defend, negotiate, fees)

### 🏠 Immobilier
- `/rp-property` - Gestion des propriétés (list, buy, sell, rent)
- `/rp-realtor` - Immobilier (listings, buy, sell, commissions)

### 🚗 Véhicules
- `/rp-vehicle` - Gestion des véhicules (list, buy, customize, sell)
- `/rp-mechanic` - Service mécanique (repair, customize, prices, orders)
- `/rp-taxi` - Service de taxi (call, status, earnings)

### ⚖️ Légal & Crime
- `/rp-legal` - Gestion légale (contract, license, criminal, arrest)
- `/rp-crime` - Activités criminelles (gang, heist, drug, wanted)

### 🏢 Organisations
- `/rp-org` - Gestion des organisations (list, join, members, treasury)
- `/rp-restaurant` - Gestion du restaurant (menu, order, stats)

### ❤️ Santé
- `/rp-health` - Gestion de la santé (status, hospital, doctor, heal)

### 💍 Social
- `/rp-marriage` - Gestion du mariage (propose, status, divorce)
- `/rp-friends` - Gestion des amis (list, add, remove, message)

### 🎓 Éducation
- `/rp-school` - Système scolaire (enroll, grades, classes, diploma)

### 🏋️ Loisirs
- `/rp-gym` - Salle de sport (stats, train, membership)
- `/rp-casino` - Casino (play, balance, jackpot)
- `/rp-events` - Événements RP (list, join, create)

### 👤 Profil
- `/rp-profile` - Voir le profil d'un joueur
- `/help` - Affiche l'aide complète

### 🎫 Support
- `/ticket-create` - Créer un ticket de support
- `/ticket` - Gestion des tickets
- `/recruitment-apply` - Candidature pour le staff
- `/recruitment` - Gestion du recrutement

### 🔧 Utilitaire
- `/ping` - Vérifie la connexion du bot
- `/boost` - Affiche les informations de boost du serveur

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou pnpm

### Étapes

1. **Cloner le repo**
```bash
git clone https://github.com/Emil01001/Verlaine-R-leplay.git
cd Verlaine-R-leplay
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer le token**
Éditer `index.js` et remplacer le token:
```javascript
const TOKEN = 'YOUR_BOT_TOKEN_HERE';
const GUILD_ID = 'YOUR_GUILD_ID_HERE';
const APP_ID = 'YOUR_APP_ID_HERE';
```

4. **Lancer le bot**
```bash
npm start
```

## 📝 Structure du projet

```
discloud-bot/
├── index.js              # Point d'entrée principal
├── package.json          # Dépendances
├── commands/             # Dossier des commandes
│   ├── rp-economy.js
│   ├── rp-bank.js
│   ├── rp-job.js
│   ├── rp-police.js
│   ├── rp-doctor.js
│   ├── rp-lawyer.js
│   ├── rp-property.js
│   ├── rp-realtor.js
│   ├── rp-vehicle.js
│   ├── rp-mechanic.js
│   ├── rp-taxi.js
│   ├── rp-legal.js
│   ├── rp-crime.js
│   ├── rp-org.js
│   ├── rp-restaurant.js
│   ├── rp-health.js
│   ├── rp-marriage.js
│   ├── rp-friends.js
│   ├── rp-school.js
│   ├── rp-gym.js
│   ├── rp-casino.js
│   ├── rp-events.js
│   ├── rp-profile.js
│   ├── ticket-create.js
│   ├── ticket.js
│   ├── recruitment-apply.js
│   ├── recruitment.js
│   ├── help.js
│   ├── ping.js
│   └── boost.js
└── README.md
```

## 🔐 Déploiement sur Discloud

1. **Créer un compte Discloud**: https://discloud.app
2. **Uploader le dossier** `discloud-bot/`
3. **Configurer les variables d'environnement**:
   - `DISCORD_BOT_TOKEN`
   - `DISCORD_GUILD_ID`
   - `VITE_APP_ID`
4. **Démarrer le bot**

## 📚 Utilisation

Toutes les commandes commencent par `/` et sont des slash commands Discord.

Exemple:
```
/rp-economy balance @user
/rp-bank transfer @user 5000
/rp-job apply avocat
/help
```

## 🛠️ Développement

Pour ajouter une nouvelle commande:

1. **Créer un fichier** dans `commands/`
2. **Exporter la structure**:
```javascript
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('command-name')
    .setDescription('Description'),
  
  async execute(interaction) {
    // Logique de la commande
  }
};
```

3. **Le bot charge automatiquement** la commande au démarrage

## 📊 Statistiques

- **32 commandes** disponibles
- **Catégories**: Économie, Métiers, Immobilier, Véhicules, Légal, Crime, Organisations, Santé, Social, Éducation, Loisirs
- **Embeds colorés** pour une meilleure présentation
- **Subcommands** pour une meilleure organisation

## 🐛 Bugs & Support

Pour signaler un bug ou demander une feature, créez une issue sur GitHub.

## 📄 Licence

MIT License - Libre d'utilisation

---

**Verlaine Roleplay** - Bot Discord développé avec ❤️
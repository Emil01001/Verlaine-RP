# 📚 Guide Complet BDFD - Système de Tickets et Bienvenue

## 🎯 Introduction à BDFD

**BDFD** (Bot Designer For Discord) est un service qui permet de créer des bots Discord sans code via une interface visuelle. C'est une alternative à JavaScript/Node.js.

---

## 📋 Variables BDFD Essentielles

### Variables de Formulaire

```
{FormResponse1} à {FormResponse5}
```
**Utilisation:** Récupère les réponses individuelles du formulaire (champ 1 à 5)

**Exemple:**
```
Réponse 1: {FormResponse1}
Réponse 2: {FormResponse2}
```

### Variable Complète du Formulaire

```
{FormComplete}
```
**Utilisation:** Affiche toutes les réponses formatées avec labels

**Exemple:**
```
{FormComplete}
```
**Résultat:**
```
Question 1: Réponse de l'utilisateur
Question 2: Réponse de l'utilisateur
```

### Variables Spéciales

```
{Separator}
```
**Utilisation:** Insère un vrai séparateur visuel Discord

```
{Raison}
```
**Utilisation:** Raison de fermeture du ticket (MP fermeture uniquement)

---

## 🎫 Système de Tickets BDFD

### Structure Basique

**Commande d'ouverture:**
```
/ticket-open
```

**Embed d'accueil:**
```
Title: 🎟️ Centre de Support
Description: Sélectionnez votre catégorie pour ouvrir un ticket
```

### Variables de Ticket

```
{TicketID}
```
Identifiant unique du ticket

```
{TicketCreator}
```
Utilisateur qui a créé le ticket

```
{TicketCategory}
```
Catégorie du ticket

```
{TicketCreatedAt}
```
Date/heure de création

---

## 📝 Formulaires BDFD

### Création d'un Formulaire

**Étapes:**
1. Créer une commande `/form-open`
2. Ajouter les champs du formulaire
3. Définir les questions
4. Configurer les réponses

### Exemple de Formulaire Tickets

**Question 1:**
```
Label: Quel est votre problème?
Type: Short Text
Required: Oui
```

**Question 2:**
```
Label: Depuis quand?
Type: Short Text
Required: Oui
```

**Question 3:**
```
Label: Avez-vous des preuves?
Type: Long Text
Required: Non
```

### Récupération des Réponses

```
{FormResponse1} = Réponse à la question 1
{FormResponse2} = Réponse à la question 2
{FormResponse3} = Réponse à la question 3
```

---

## 🎉 Système de Bienvenue BDFD

### Événement d'Arrivée

**Trigger:** `Member Join`

**Variables disponibles:**

```
{member.username}
```
Nom de l'utilisateur

```
{member.mention}
```
Mention de l'utilisateur

```
{member.avatar}
```
Avatar de l'utilisateur

```
{server.membercount}
```
Nombre total de membres

```
{member.id}
```
ID de l'utilisateur

### Embed de Bienvenue

```
Title: 🎉 Bienvenue {member.username}!
Description: Bienvenue sur Verlaine RP!
Thumbnail: {member.avatar}
Footer: Membre #{server.membercount}
```

### Message Privé

```
{member.send}
Embed: Bienvenue sur notre serveur!
```

---

## 🚀 Système de Notifications

### Notification de Nouveau Ticket

**Trigger:** Quand un ticket est créé

**Variables:**
```
{TicketCreator} = Créateur du ticket
{TicketID} = ID du ticket
{TicketCategory} = Catégorie
{TicketCreatedAt} = Date/heure
```

**Embed:**
```
Title: 🔔 Nouveau Ticket #{TicketID}
Description: Créé par {TicketCreator}
Field 1: Catégorie - {TicketCategory}
Field 2: Date - {TicketCreatedAt}
```

### Notification de Boost

**Trigger:** `Member Boost`

**Variables:**
```
{member.username} = Nom du booster
{member.avatar} = Avatar du booster
{server.name} = Nom du serveur
```

**Embed:**
```
Title: ⭐ Merci pour le boost!
Description: Merci {member.username} d'avoir boosté {server.name}!
Thumbnail: {member.avatar}
```

---

## 🔧 Commandes Utiles BDFD

### Commande de Ticket

```
/ticket-open
- Type: Slash Command
- Response: Embed + Select Menu
- Variables: {TicketID}, {TicketCreator}
```

### Commande de Formulaire

```
/form-open
- Type: Slash Command
- Form Fields: 5 questions
- Response: {FormComplete}
```

### Commande de Bienvenue

```
/welcome-set <channel>
- Type: Slash Command
- Trigger: Member Join
- Variables: {member.username}, {member.avatar}
```

---

## 📊 Exemple Complet: Système de Ticket

### Étape 1: Créer la Commande

```
Command: /ticket-support
Type: Slash Command
```

### Étape 2: Ajouter le Select Menu

```
Options:
- Administration
- Partenariat
- Autre
```

### Étape 3: Créer le Formulaire

```
Question 1: Décrivez votre problème
Question 2: Depuis quand?
Question 3: Avez-vous des preuves?
Question 4: Urgence?
Question 5: Infos supplémentaires?
```

### Étape 4: Créer le Ticket

```
Channel Name: ticket-{TicketID}
Permissions: Créateur + Staff
Embed: 
  Title: Ticket #{TicketID}
  Description: {FormComplete}
  Footer: Créé par {TicketCreator}
```

### Étape 5: Notification

```
Embed:
  Title: 🔔 Nouveau Ticket
  Description: {TicketCreator} a créé un ticket
  Fields:
    - Catégorie: {TicketCategory}
    - ID: {TicketID}
    - Date: {TicketCreatedAt}
```

---

## 🎨 Personnalisation Avancée

### Couleurs BDFD

```
#0099ff = Bleu (Support)
#00ff00 = Vert (Succès)
#ff0000 = Rouge (Erreur)
#ffff00 = Jaune (Notification)
#ff00ff = Magenta (Boost)
```

### Emojis Utiles

```
🎟️ = Ticket
🔔 = Notification
⭐ = Boost
🎉 = Bienvenue
📋 = Formulaire
✅ = Succès
❌ = Erreur
```

### Séparateurs

```
{Separator}
━━━━━━━━━━━━━━━━━━━━━━
═══════════════════════
───────────────────────
```

---

## 💡 Bonnes Pratiques

1. **Toujours valider les formulaires** - Vérifier que les réponses sont valides
2. **Utiliser des séparateurs** - Pour une meilleure lisibilité
3. **Ajouter des timestamps** - Pour tracer les actions
4. **Notifier le staff** - À chaque nouveau ticket
5. **Personnaliser les embeds** - Avec couleurs et emojis
6. **Tester avant de publier** - Vérifier tous les cas d'usage

---

## 🔗 Ressources Utiles

- **Site BDFD:** https://bdfd.xyz
- **Documentation:** https://docs.bdfd.xyz
- **Serveur Support:** https://discord.gg/bdfd
- **Variables Complètes:** https://docs.bdfd.xyz/guide/variables

---

**Créé pour Verlaine RP - Mai 2026**

# Deep Skills Server Setup

## Installation

1. Naviguez dans le dossier serveur:
```bash
cd server
```

2. Installez les dépendances:
```bash
npm install
```

## Démarrage

### Mode développement
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur démarrera sur `http://localhost:3001`

## API Endpoints

### GET /api/health
Vérifier que le serveur fonctionne
```
GET http://localhost:3001/api/health
```

### POST /api/send-whatsapp
Envoyer un message WhatsApp
```
POST http://localhost:3001/api/send-whatsapp
Content-Type: application/json

{
  "trainingTitle": "React.js Masterclass"
}
```

## Configuration

Le serveur utilise actuellement le numéro WhatsApp: `21650985534`

Pour changer le numéro, modifiez la variable `WHATSAPP_PHONE` dans `server.js`

## Utilisation avec le Frontend

Le frontend React appelle automatiquement ce serveur quand l'utilisateur clique sur "Réserver une place"

Le message s'ouvre dans WhatsApp Web avec le texte pré-rempli.

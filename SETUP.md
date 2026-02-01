# Deep Skills Showcase - Guide Complet

## 📋 Structure du Projet

```
deep-skills-showcase/
├── src/                    # Frontend React + TypeScript
│   ├── pages/             # Pages de l'application
│   ├── components/        # Composants React
│   ├── data/              # Données des formations
│   └── ...
├── server/                # Backend Express.js
│   ├── server.js          # Serveur principal
│   ├── package.json       # Dépendances serveur
│   └── README.md          # Documentation serveur
├── start-all.bat          # Script pour démarrer les deux serveurs (Windows)
├── start-all.sh           # Script pour démarrer les deux serveurs (Linux/Mac)
└── vite.config.ts         # Configuration Vite
```

## 🚀 Démarrage Rapide

### Option 1: Démarrer les deux serveurs ensemble (Windows)
```bash
start-all.bat
```

### Option 2: Démarrer les deux serveurs ensemble (Linux/Mac)
```bash
bash start-all.sh
```

### Option 3: Démarrer manuellement

#### Frontend (dans le dossier racine)
```bash
npm install
npm run dev
```
Accessible à: http://localhost:8082

#### Backend (dans le dossier `/server`)
```bash
cd server
npm install
node server.js
```
Accessible à: http://localhost:3001

## 📱 Fonctionnalités

### Formations Disponibles
1. **Personal Branding** - 70 DT, 5h
2. **Développement Web** - 250 DT, 48h
3. **Automatisation n8n** - 150 DT, 15h
4. **Cyber Security** - 180 DT, 20h
5. **Power BI** - 200 DT, 30h
6. **Linux** - 180 DT, 20h
7. **Test Logiciel** - 180 DT, 20h

### Réservation WhatsApp
- Cliquez sur "Réserver une place"
- Le message s'envoie automatiquement à WhatsApp
- Numéro: **+216 50 985 534**

## 🛠️ Commandes Utiles

### Frontend
```bash
npm run dev          # Développement avec HMR
npm run build        # Build production
npm run lint         # Vérifier le code
npm test             # Exécuter les tests
npm test:watch       # Tests en mode watch
```

### Backend
```bash
cd server
node server.js       # Démarrer le serveur
npm run dev          # Démarrer avec nodemon (watch mode)
```

## 📦 Dépendances

### Frontend
- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- shadcn-ui
- Framer Motion
- React Router v6

### Backend
- Express.js
- CORS
- Node.js

## 🌐 API Endpoints

### Health Check
```
GET http://localhost:3001/api/health
```

### Envoyer un message WhatsApp
```
POST http://localhost:3001/api/send-whatsapp
Content-Type: application/json

{
  "trainingTitle": "React.js Masterclass"
}
```

## 📝 Configuration

### Changer le numéro WhatsApp
Modifiez le fichier `server/server.js`:
```javascript
const WHATSAPP_PHONE = '21650985534'; // Changez ce numéro
```

## 🔧 Troubleshooting

### Port déjà utilisé
Si le port 8082 est utilisé, Vite utilisera automatiquement le port suivant.

### Serveur backend ne démarre pas
```bash
cd server
npm install
node server.js
```

### Erreur CORS
Assurez-vous que le serveur backend est en cours d'exécution sur `http://localhost:3001`

## 📚 Documentation Supplémentaire

- [Frontend README](./README.md)
- [Backend README](./server/README.md)
- [Copilot Instructions](./.github/copilot-instructions.md)

## 👨‍💻 Développement

Pour modifier le comportement:

1. **Ajouter une nouvelle formation**: Modifiez `src/data/trainings.ts`
2. **Modifier le style**: Utilisez Tailwind CSS dans les composants
3. **Ajouter une page**: Créez un fichier dans `src/pages/`
4. **Modifier le message WhatsApp**: Changez le message dans `src/pages/TrainingDetail.tsx`

## 📄 Licence

Propriétaire - Deep Skills Showcase

---

**Dernière mise à jour:** Février 2026

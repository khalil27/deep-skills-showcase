# 🚀 Guide d'Utilisation - Deep Skills Showcase

## 📋 Vue d'Ensemble

Le système maintenant envoie automatiquement les messages WhatsApp **sans que l'utilisateur ait besoin de cliquer sur "Envoyer"**.

## 🎯 Processus Complet

### Pour l'Utilisateur Final:
1. ✅ Clique sur "Réserver une place"
2. ✅ Message envoyé automatiquement sur WhatsApp
3. ✅ Reçoit un message de confirmation

### Technique (Backend):
1. Frontend → POST à `/api/send-whatsapp`
2. Backend utilise WhatsApp Web.js
3. Message envoyé automatiquement via votre compte
4. Réponse de confirmation au frontend

## 🎛️ Installation et Démarrage

### Première Utilisation

#### 1. Installer les dépendances
```bash
npm install  # Frontend
cd server && npm install  # Backend
cd ..
```

#### 2. Démarrer les serveurs

**Option A - Windows (Recommandé):**
```bash
start-all.bat
```

**Option B - Manuellement:**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
cd server
node server.js
```

#### 3. Scanner le QR Code WhatsApp

Lors du premier démarrage du serveur:
1. Un **QR Code** s'affiche dans le terminal
2. Ouvrez **WhatsApp** sur votre téléphone
3. Allez à **Paramètres > Appareils connectés**
4. Tapez **Connecter un appareil**
5. Scannez le QR Code

#### 4. Confirmation
Vous verrez dans le terminal:
```
✅ WhatsApp Client is ready!
```

## 🌐 Accès à l'Application

```
Frontend:  http://localhost:8082
Backend:   http://localhost:3001
```

## ✨ Démonstration

1. Allez à http://localhost:8082/formations
2. Cliquez sur une formation
3. Cliquez sur **"Réserver une place"**
4. ✅ Le message est envoyé automatiquement!
5. Vous recevez un message de confirmation

## 🔧 Configuration

### Changer le numéro WhatsApp

Modifiez `server/server.js`:
```javascript
const WHATSAPP_PHONE = '21650985534'; // Changez ce numéro
```

### Changer le port du serveur

Modifiez les variables d'environnement:
```bash
# Linux/Mac
export PORT=3001
node server/server.js

# Windows
set PORT=3001
node server/server.js
```

## 📱 Formations Disponibles

| Formation | Prix | Durée |
|-----------|------|-------|
| Personal Branding | 70 DT | 5h |
| Développement Web | 250 DT | 48h |
| n8n Automation | 150 DT | 15h |
| Cyber Security | 180 DT | 20h |
| Power BI | 200 DT | 30h |
| Linux | 180 DT | 20h |
| Test Logiciel | 180 DT | 20h |

## 🐛 Dépannage

### Erreur: "WhatsApp n'est pas connecté"
- Assurez-vous d'avoir scanné le QR Code
- Vérifiez que votre téléphone WhatsApp est allumé
- Redémarrez le serveur backend

### Erreur: "Cannot connect to backend"
- Assurez-vous que le serveur backend s'exécute sur http://localhost:3001
- Vérifiez le pare-feu
- Vérifiez que le port 3001 n'est pas utilisé

### Le QR Code n'apparaît pas
- Attendez 5-10 secondes au démarrage du serveur
- Vérifiez la console du serveur pour les messages d'erreur
- Redémarrez le serveur

### WhatsApp se déconnecte
- Cela peut arriver si votre téléphone perd la connexion
- Redémarrez le serveur
- Scannez à nouveau le QR Code si nécessaire

## 📊 API Endpoints

### GET /api/health
Vérifier l'état du serveur:
```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "OK",
  "whatsappReady": true,
  "message": "Deep Skills Server is running"
}
```

### GET /api/whatsapp-status
Vérifier l'état WhatsApp:
```bash
curl http://localhost:3001/api/whatsapp-status
```

### POST /api/send-whatsapp
Envoyer un message:
```bash
curl -X POST http://localhost:3001/api/send-whatsapp \
  -H "Content-Type: application/json" \
  -d '{"trainingTitle": "React.js Masterclass"}'
```

## 🔒 Sécurité

- Les messages sont envoyés depuis votre propre compte WhatsApp
- Aucun tiers ne peut envoyer de messages au vôtre
- Votre téléphone doit être connecté pour que le système fonctionne

## 📞 Support Technique

En cas de problème:

1. **Vérifiez les logs** du terminal backend
2. **Redémarrez** le serveur
3. **Rescanisez** le QR Code si nécessaire
4. **Vérifiez** la connexion Internet

## 🎓 Pour les Développeurs

### Structure du Projet
```
server/
├── server.js              # Serveur Express principal
├── package.json           # Dépendances
├── WHATSAPP_SETUP.md      # Configuration WhatsApp
└── node_modules/          # Dépendances installées

src/
├── pages/
│   └── TrainingDetail.tsx # Gère l'envoi WhatsApp
├── data/
│   └── trainings.ts       # Données des formations
└── ...
```

### Modifier le message
Éditez `src/pages/TrainingDetail.tsx`:
```typescript
const message = `Bonjour, je souhaite réserver une place pour ${training.title}`;
```

## 📝 Fichiers Importants

- `server/server.js` - Backend WhatsApp
- `src/pages/TrainingDetail.tsx` - Frontend pour envoyer
- `SETUP.md` - Guide complet
- `server/WHATSAPP_SETUP.md` - Configuration WhatsApp

---

**Dernière mise à jour:** Février 2026

✨ **Bon usage du système d'envoi WhatsApp automatique!** ✨

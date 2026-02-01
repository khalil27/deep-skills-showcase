# 📊 Architecture du Système - Deep Skills Showcase

## 🏗️ Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                    UTILISATEUR FINAL                         │
│              (Navigateur Web - http://8082)                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ 1. Clique "Réserver une place"
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND REACT + TYPESCRIPT                     │
│         src/pages/TrainingDetail.tsx                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ - Affiche les détails de la formation               │   │
│  │ - Bouton "Réserver une place"                       │   │
│  │ - Appel: POST /api/send-whatsapp                    │   │
│  │ - Affiche le statut de l'envoi                      │   │
│  └──────────────────────────────────────────────────────┘   │
│         (Vite Dev Server - http://localhost:8082)           │
└────────────────────┬────────────────────────────────────────┘
                     │
        2. Requête HTTP POST
     {trainingTitle: "React.js"}
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         BACKEND NODEJS + EXPRESS                             │
│              server/server.js                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ POST /api/send-whatsapp                             │   │
│  │ ┌─────────────────────────────────────────────────┐  │   │
│  │ │ 3. Reçoit la requête                            │  │   │
│  │ │ 4. Valide les données                           │  │   │
│  │ │ 5. Crée le message                              │  │   │
│  │ └─────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                      │                                       │
│                      │ 6. Envoie via WhatsApp               │
│                      ▼                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   WHATSAPP-WEB.JS (Puppeteer)                        │   │
│  │ ┌─────────────────────────────────────────────────┐  │   │
│  │ │ - Se connecte au compte WhatsApp               │  │   │
│  │ │ - Compose le message automatiquement            │  │   │
│  │ │ - Clique sur "Envoyer" (autorisé)              │  │   │
│  │ │ - Ferme la conversation                        │  │   │
│  │ └─────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│              (http://localhost:3001)                         │
└────────────────────┬────────────────────────────────────────┘
                     │
        7. Message envoyé automatiquement
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    WHATSAPP WEB                             │
│        Compte: +216 50 985 534                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Message: "Bonjour, je souhaite réserver une place   │   │
│  │          pour React.js Masterclass"                │   │
│  │                                                      │   │
│  │ Destinataire: Client                               │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ 8. Message reçu
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         TELEPHONE CLIENT WhatsApp                            │
│      Message: "Bonjour, je souhaite..."                    │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Flux de Données Détaillé

### Étape 1-2: Initiation depuis le Frontend
```typescript
// src/pages/TrainingDetail.tsx
const handleWhatsAppReservation = async () => {
  const response = await fetch('http://localhost:3001/api/send-whatsapp', {
    method: 'POST',
    body: JSON.stringify({ trainingTitle: training.title })
  });
  const data = await response.json();
  // Affiche la confirmation
};
```

### Étape 3-6: Traitement par le Backend
```javascript
// server/server.js
app.post('/api/send-whatsapp', async (req, res) => {
  const { trainingTitle } = req.body;
  const message = `Bonjour, je souhaite réserver...${trainingTitle}`;
  
  // Envoie automatiquement via WhatsApp
  await whatsappClient.sendMessage('21650985534@c.us', message);
  
  res.json({ success: true });
});
```

### Étape 7-8: Message Reçu
Le message arrive instantanément sur le téléphone du client.

## 🔐 Configuration Requise

### Configuration Initial (QR Code)
```
Serveur démarre
    ↓
Pupeteer lance WhatsApp Web
    ↓
QR Code généré
    ↓
Utilisateur scanne avec téléphone
    ↓
Session établie
    ↓
✅ Prêt à envoyer des messages
```

## 📱 État des Appareils

### Avant Utilisation:
```
WhatsApp Web (Backend): ❌ Déconnecté
Téléphone (Utilisateur): ✅ Connecté à Internet
Serveur (Backend):       ✅ En cours d'exécution
Frontend (Utilisateur):  ✅ Chargé
```

### Après Scanner du QR Code:
```
WhatsApp Web (Backend): ✅ Connecté
Téléphone (Utilisateur): ✅ Connecté
Serveur (Backend):       ✅ Prêt
Frontend (Utilisateur):  ✅ Fonctionnel
```

## 🔌 Ports et Services

```
Port 8082  ← Frontend Vite (React)
Port 3001  ← Backend Express (WhatsApp)
Port 9222  ← Chrome DevTools (Puppeteer - interne)

Dépendances Principales:
├── Express.js       (Framework Web)
├── WhatsApp-Web.js  (Client WhatsApp)
├── Puppeteer        (Navigateur automatisé)
├── React 18         (UI Frontend)
├── TypeScript        (Typage Static)
└── Tailwind CSS      (Styling)
```

## 🔄 Cycle de Vie d'une Réservation

```
User Action          Backend Action           WhatsApp Action
─────────────────────────────────────────────────────────────
[Click Button]
        │
        ├─→ POST Request
        │        │
        │        └─→ [Receive]
        │             │
        │             ├─→ [Validate]
        │             │
        │             ├─→ [Format Message]
        │             │
        │             ├─→ [Send via WA]
        │             │        │
        │             │        └─→ [Compose]
        │             │             │
        │             │             ├─→ [Fill Text]
        │             │             │
        │             │             ├─→ [Click Send]
        │             │             │
        │             │             └─→ [Verify Sent]
        │             │
        │        ┌────┴─→ [Response: Success]
        │        │
[Show Confirm]←──┴───[JSON: {success: true}]
```

## 🎯 Points Critiques

### 1. Frontend
- ✅ Réactive à l'utilisateur
- ✅ Appelle le backend
- ✅ Affiche les statuts

### 2. Backend
- ✅ Reçoit les requêtes
- ✅ Contrôle WhatsApp Web
- ✅ Envoie automatiquement

### 3. WhatsApp Web
- ✅ Session maintenue
- ✅ Authentification via QR
- ✅ Envoi automatisé

## 📈 Performance

```
Action                        Temps Moyen
────────────────────────────────────────
User Click                    0 ms (instant)
Network Request              50-100 ms
Backend Processing           100-200 ms
WhatsApp Send                500-1000 ms
User Notification            100 ms
────────────────────────────────────────
Total                        700-1400 ms
```

## 🔐 Sécurité

```
Frontend (Public)
    ↓
    └─→ [HTTPS recommandé]
    
Backend (Local Network)
    ↓
    └─→ [CORS Enabled]
    └─→ [Local Only: localhost:3001]
    
WhatsApp (Votre compte)
    ↓
    └─→ [Authentification: QR Code]
    └─→ [Messages depuis votre numéro]
    └─→ [Contrôle total du client]
```

---

**Architecture Simple, Robuste et Automatisée** ✨

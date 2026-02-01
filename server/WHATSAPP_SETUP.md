# Configuration WhatsApp Automatique

## 🚀 Première Utilisation

Avant de pouvoir envoyer des messages automatiquement, vous devez scanner un QR Code depuis votre téléphone WhatsApp.

### Étapes:

1. **Démarrer le serveur**
```bash
cd server
node server.js
```

2. **Attendre le QR Code**
   - Le serveur affichera un QR Code dans le terminal
   - Vous verrez: "📱 QR Code received. Scan it with your WhatsApp phone:"

3. **Scanner avec votre téléphone**
   - Ouvrez WhatsApp sur votre téléphone
   - Allez dans **Paramètres > Appareils connectés** (ou **Linked Devices**)
   - Tapez sur **Connecter un appareil**
   - Scannez le QR Code affiché dans le terminal

4. **Validation**
   - Vous verrez dans le terminal: "✅ WhatsApp Client is ready!"
   - Le système est maintenant prêt à envoyer des messages

## 📱 Comment ça marche

1. L'utilisateur clique sur "Réserver une place"
2. Le frontend envoie une demande au backend
3. Le backend envoie automatiquement le message via votre compte WhatsApp
4. Un message de confirmation s'affiche

## 🔧 Commandes

### Démarrer le serveur
```bash
cd server
node server.js
```

### Tester manuellement
```bash
curl -X POST http://localhost:3001/api/send-whatsapp \
  -H "Content-Type: application/json" \
  -d '{"trainingTitle": "React.js Masterclass"}'
```

### Vérifier l'état
```bash
curl http://localhost:3001/api/whatsapp-status
```

## ⚠️ Important

- Le QR Code change à chaque redémarrage du serveur
- Une fois scanné, la session est sauvegardée localement
- N'oubliez pas de scanner le QR Code la première fois
- Votre téléphone doit être connecté à Internet

## 🛠️ Troubleshooting

### Le QR Code n'apparaît pas
- Assurez-vous que Node.js est correctement installé
- Vérifiez que le port 3001 n'est pas utilisé

### "WhatsApp n'est pas connecté"
- Scannez à nouveau le QR Code
- Vérifiez que votre téléphone WhatsApp est allumé

### Les messages ne s'envoient pas
- Vérifiez que WhatsApp est connecté (✅ WhatsApp Client is ready!)
- Vérifiez la connexion Internet
- Essayez de redémarrer le serveur

## 📝 Notes

- Les messages sont envoyés depuis votre numéro WhatsApp
- Les clients reçoivent les messages directement de vous
- C'est plus fiable que WhatsApp Web seul

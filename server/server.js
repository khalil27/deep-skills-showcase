import express from 'express';
import cors from 'cors';
import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// IMPORTANT: Set environment variables BEFORE importing whatsapp-web.js
process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'false';

// Try to find Chrome/Chromium on the system
const possiblePaths = [
  '/usr/bin/chromium-browser',    // Render.com Aptfile
  '/usr/bin/chromium',             // Linux standard
  '/usr/bin/google-chrome',        // Google Chrome Linux
  '/opt/render/.cache/puppeteer/chrome/linux-chrome',  // Puppeteer cache on Render
  path.join(process.cwd(), 'node_modules', 'puppeteer', '.local-chromium'),
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let chromePath = null;
for (const p of possiblePaths) {
  try {
    if (fs.existsSync(p)) {
      chromePath = p;
      console.log(`✅ Found Chrome/Chromium at: ${p}`);
      break;
    }
  } catch (e) {
    // Continue searching
  }
}

// Set the path if found, otherwise let Puppeteer find it
if (chromePath) {
  process.env.PUPPETEER_EXECUTABLE_PATH = chromePath;
  console.log(`Using Chrome from: ${chromePath}`);
}

const { Client, LocalAuth } = pkg;

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration
const WHATSAPP_PHONE = '21650985534'; // Votre numéro WhatsApp (sans le +)
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Middleware
app.use(cors());
app.use(express.json());

// État du client WhatsApp
let whatsappClient = null;
let isClientReady = false;
let lastQRCode = null;

// Initialiser le client WhatsApp
const initializeWhatsApp = () => {
  const puppeteerConfig = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  };

  // executablePath est déjà défini via l'environment variable
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    puppeteerConfig.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  whatsappClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: puppeteerConfig
  });

  whatsappClient.on('qr', (qr) => {
    console.log('\n📱 QR Code received. Scan it with your WhatsApp phone:');
    qrcode.generate(qr, { small: true });
    lastQRCode = qr; // Sauvegarder le QR code
  });

  whatsappClient.on('ready', () => {
    console.log('✅ WhatsApp Client is ready!');
    isClientReady = true;
  });

  whatsappClient.on('disconnected', (reason) => {
    console.log('❌ WhatsApp Client was disconnected:', reason);
    isClientReady = false;
  });

  whatsappClient.initialize();
};

// Initialiser WhatsApp au démarrage
initializeWhatsApp();

// Endpoint pour afficher le QR code visuellement
app.get('/qr', async (req, res) => {
  if (!lastQRCode) {
    return res.status(503).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>WhatsApp QR Code</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 40px; }
          .status { color: red; font-size: 18px; }
        </style>
      </head>
      <body>
        <h1>🔄 En attente du QR Code...</h1>
        <p class="status">Le serveur initialise WhatsApp...</p>
        <p>Veuillez attendre quelques secondes et rafraîchir la page.</p>
        <script>
          // Rafraîchir automatiquement toutes les 2 secondes
          setTimeout(() => location.reload(), 2000);
        </script>
      </body>
      </html>
    `);
  }

  try {
    const qrImage = await QRCode.toDataURL(lastQRCode);
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>WhatsApp QR Code</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
          }
          .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 500px;
          }
          h1 {
            color: #333;
            margin-top: 0;
          }
          .qr-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .qr-container img {
            width: 100%;
            max-width: 300px;
            height: auto;
          }
          .instructions {
            background: #f0f0f0;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
          }
          .instructions h3 {
            margin-top: 0;
          }
          .instructions ol {
            margin: 10px 0;
            padding-left: 20px;
          }
          .instructions li {
            margin: 8px 0;
          }
          .status {
            color: #667eea;
            font-weight: bold;
            margin: 20px 0;
          }
          .emoji { font-size: 24px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1><span class="emoji">📱</span> Connexion WhatsApp</h1>
          
          <div class="qr-container">
            <img src="${qrImage}" alt="QR Code" />
          </div>
          
          <p class="status">✅ QR Code généré - Scannez maintenant!</p>
          
          <div class="instructions">
            <h3>Comment scanner:</h3>
            <ol>
              <li>Ouvrez <strong>WhatsApp</strong> sur votre téléphone</li>
              <li>Allez à <strong>Paramètres</strong> <span class="emoji">⚙️</span></li>
              <li>Sélectionnez <strong>Appareils connectés</strong></li>
              <li>Tapez <strong>Connecter un appareil</strong></li>
              <li>Scannez ce code QR avec votre téléphone</li>
            </ol>
          </div>
          
          <p style="color: #999; font-size: 12px;">
            La session sera sauvegardée - plus besoin de scanner après!
          </p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Erreur lors de la génération du QR code');
  }
});

// Endpoint pour envoyer un message WhatsApp AU CLIENT
app.post('/api/send-to-client', async (req, res) => {
  try {
    const { clientPhone, clientName, trainingTitle, trainingPrice, trainingDuration, trainingMode } = req.body;
    
    if (!clientPhone || !clientName || !trainingTitle) {
      return res.status(400).json({ 
        success: false, 
        error: 'Informations manquantes (téléphone, nom ou formation)' 
      });
    }

    if (!isClientReady) {
      return res.status(503).json({ 
        success: false, 
        error: 'WhatsApp n\'est pas connecté. Veuillez scanner le QR Code.' 
      });
    }

    // Message de confirmation à envoyer au client
    const message = `Bonjour ${clientName}! 👋

Merci pour votre intérêt pour notre formation! 🎓

📚 *${trainingTitle}*
💰 Prix: ${trainingPrice} DT
⏱️ Durée: ${trainingDuration}
📍 Mode: ${trainingMode}

Nous avons bien reçu votre demande de réservation. Notre équipe va vous contacter prochainement pour confirmer votre inscription.

Pour toute question, n'hésitez pas à nous contacter!

Deep Skills - Formation Professionnelle`;
    
    // Nettoyer le numéro de téléphone (enlever espaces, tirets, etc.)
    const cleanPhone = clientPhone.replace(/[^0-9]/g, '');
    
    // Convertir le numéro au format WhatsApp
    const chatId = `${cleanPhone}@c.us`;
    
    console.log(`📤 Envoi du message au client: ${clientName} (${cleanPhone})`);
    
    // Envoyer le message
    await whatsappClient.sendMessage(chatId, message);
    
    console.log(`✅ Message envoyé avec succès à ${clientName}`);
    
    res.json({
      success: true,
      message: `Message de confirmation envoyé à ${clientName}`,
      clientPhone: cleanPhone,
      trainingTitle: trainingTitle
    });
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi du message WhatsApp:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de l\'envoi: ' + error.message 
    });
  }
});

// Ancien endpoint (garde pour compatibilité)
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { trainingTitle } = req.body;
    
    if (!trainingTitle) {
      return res.status(400).json({ 
        success: false, 
        error: 'Le nom de la formation est requis' 
      });
    }

    if (!isClientReady) {
      return res.status(503).json({ 
        success: false, 
        error: 'WhatsApp n\'est pas connecté. Veuillez scanner le QR Code.' 
      });
    }

    const message = `Bonjour, je souhaite réserver une place pour la formation ${trainingTitle}`;
    
    // Convertir le numéro au format WhatsApp (avec @c.us pour les contacts normaux)
    const chatId = `${WHATSAPP_PHONE}@c.us`;
    
    // Envoyer le message
    await whatsappClient.sendMessage(chatId, message);
    
    console.log(`📤 Message sent for training: ${trainingTitle}`);
    
    res.json({
      success: true,
      message: `Message envoyé avec succès pour ${trainingTitle}`,
      trainingTitle: trainingTitle
    });
  } catch (error) {
    console.error('❌ Error sending WhatsApp message:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de l\'envoi du message: ' + error.message 
    });
  }
});

// Endpoint pour vérifier l'état du client
app.get('/api/whatsapp-status', (req, res) => {
  res.json({
    status: isClientReady ? 'connected' : 'disconnected',
    ready: isClientReady,
    message: isClientReady 
      ? 'WhatsApp est connecté et prêt' 
      : 'En attente de connexion WhatsApp. Scannez le QR Code.'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Deep Skills Server is running',
    whatsappReady: isClientReady,
    timestamp: new Date().toISOString()
  });
});

// Route par défaut
app.get('/', (req, res) => {
  res.json({ 
    message: 'Deep Skills Formation API Server',
    whatsappStatus: isClientReady ? 'Ready' : 'Not Connected',
    qrUrl: '/qr',
    endpoints: {
      health: 'GET /api/health',
      whatsappStatus: 'GET /api/whatsapp-status',
      sendWhatsApp: 'POST /api/send-whatsapp',
      qrCode: 'GET /qr'
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Deep Skills Server running on http://localhost:${PORT}`);
  console.log(`📱 WhatsApp Number: +${WHATSAPP_PHONE}`);
  console.log(`${'='.repeat(50)}\n`);
});

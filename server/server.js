import express from 'express';
import cors from 'cors';
import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import fs from 'fs';

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

// Initialiser le client WhatsApp
const initializeWhatsApp = () => {
  const puppeteerConfig = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process'
    ]
  };

  // Chercher Chrome/Chromium sur le système
  const possiblePaths = [
    '/usr/bin/chromium-browser',    // Render.com
    '/usr/bin/chromium',             // Linux standard
    '/usr/bin/google-chrome',        // Google Chrome Linux
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // macOS
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',   // Windows
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];

  let executablePath = null;
  for (const path of possiblePaths) {
    try {
      if (fs.existsSync(path)) {
        executablePath = path;
        console.log(`✅ Found Chrome/Chromium at: ${path}`);
        break;
      }
    } catch (e) {
      // Continue searching
    }
  }

  if (executablePath) {
    puppeteerConfig.executablePath = executablePath;
  } else if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    puppeteerConfig.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  whatsappClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: puppeteerConfig
  });

  whatsappClient.on('qr', (qr) => {
    console.log('\n📱 QR Code received. Scan it with your WhatsApp phone:');
    qrcode.generate(qr, { small: true });
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
    endpoints: {
      health: 'GET /api/health',
      whatsappStatus: 'GET /api/whatsapp-status',
      sendWhatsApp: 'POST /api/send-whatsapp'
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Deep Skills Server running on http://localhost:${PORT}`);
  console.log(`📱 WhatsApp Number: +${WHATSAPP_PHONE}`);
  console.log(`${'='.repeat(50)}\n`);
});

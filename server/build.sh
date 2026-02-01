#!/bin/bash

# Installation des dépendances système pour Puppeteer
echo "Installing system dependencies for Puppeteer..."
apt-get update
apt-get install -y \
  chromium-browser \
  libnss3 \
  libxss1 \
  libasound2 \
  libappindicator1 \
  libindicator7 \
  xdg-utils \
  fonts-liberation \
  libgbm1 \
  libxkbcommon0 \
  libdrm2

# Installation des dépendances Node
echo "Installing Node dependencies..."
npm install

echo "Build complete!"

#!/bin/bash
set -e

echo "Installing system dependencies for Chrome..."
apt-get update -qq
apt-get install -y -qq \
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
  libdrm2 \
  libatk-bridge2.0-0 \
  libgconf-2-4 \
  libnss3 \
  libxss1

echo "System dependencies installed!"
echo "Starting server..."
node server.js

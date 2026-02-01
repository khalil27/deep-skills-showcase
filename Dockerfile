FROM node:22-slim

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \
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
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY server/package*.json ./server/
COPY package*.json ./

# Install dependencies
RUN cd server && npm install && cd ..

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy server code
COPY server ./server

EXPOSE 3001

# Start the server
CMD ["node", "server/server.js"]

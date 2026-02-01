#!/bin/bash
set -e

echo "Installing Node dependencies..."
cd server
npm install
cd ..

echo "Build complete!"

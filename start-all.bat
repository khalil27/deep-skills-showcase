@echo off
REM Start both frontend and backend servers for Deep Skills

echo.
echo ========================================
echo    Deep Skills Showcase - Start All
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed
    exit /b 1
)

echo Starting Backend Server (Express + WhatsApp)...
echo.
echo IMPORTANT: Si c'est la premiere fois:
echo   1. Un QR Code apparaitra dans la fenetre du serveur
echo   2. Scannez-le avec votre telephone WhatsApp
echo   3. Parametres ^> Appareils connectes ^> Connecter un appareil
echo.
timeout /t 3 /nobreak

start "Deep Skills Backend" cmd /k "cd /d "c:\Users\khalil\Desktop\deep_flow\deep-skills-showcase\server" && node server.js"

echo Attente de connexion du serveur...
timeout /t 5 /nobreak

echo.
echo Starting Frontend Server (Vite)...
start "Deep Skills Frontend" cmd /k "cd /d "c:\Users\khalil\Desktop\deep_flow\deep-skills-showcase" && npm run dev"

echo.
echo ========================================
echo  ✅ Les serveurs demarrent...
echo ========================================
echo.
echo Frontend: http://localhost:8082
echo Backend:  http://localhost:3001
echo.
echo Fermez les fenetres pour arreter les serveurs.
echo ========================================
echo.

pause

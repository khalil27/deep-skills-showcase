#!/bin/bash
# Start both frontend and backend servers

echo "🚀 Starting Deep Skills Showcase..."
echo ""

# Start frontend in background
echo "Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

# Wait a bit for frontend to start
sleep 3

# Start backend in another terminal/process
echo "Starting backend server..."
cd server && node server.js &
BACKEND_PID=$!

echo ""
echo "✅ Both servers are running!"
echo "Frontend: http://localhost:8082"
echo "Backend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt
wait

#!/bin/bash

# BrainLab Admin Panel - Quick Start Script

echo "🚀 BrainLab Admin Panel - Starting..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install from https://nodejs.org${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm found: $(npm --version)${NC}"

# Install backend dependencies
echo -e "\n${BLUE}📦 Installing backend dependencies...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install --silent
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backend dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install backend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Backend dependencies already installed${NC}"
fi
cd ..

# Install frontend dependencies
echo -e "\n${BLUE}📦 Installing frontend dependencies...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install --silent
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi
cd ..

# Create .env file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo -e "\n${BLUE}⚙️  Creating backend/.env file...${NC}"
    cat > backend/.env << EOF
PORT=3001
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=development
EOF
    echo -e "${GREEN}✅ Created backend/.env${NC}"
fi

# Start services
echo -e "\n${BLUE}🔧 Starting services...${NC}"

# Start Backend
echo -e "\n${BLUE}Starting Backend (port 3001)...${NC}"
cd backend
npm start > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
cd ..

sleep 2

# Check if backend is running
if ! ps -p $BACKEND_PID > /dev/null; then
    echo -e "${RED}❌ Failed to start backend${NC}"
    cat /tmp/backend.log
    exit 1
fi

# Start Frontend
echo -e "\n${BLUE}Starting Frontend (port 3000)...${NC}"
cd frontend
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
cd ..

sleep 3

# Check if frontend is running
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${RED}❌ Failed to start frontend${NC}"
    kill $BACKEND_PID
    cat /tmp/frontend.log
    exit 1
fi

echo -e "\n${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 BrainLab Admin Panel is running!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "\n${BLUE}📍 Access the admin panel:${NC}"
echo -e "   ${GREEN}http://localhost:3000${NC}"
echo -e "\n${BLUE}📡 API endpoint:${NC}"
echo -e "   ${GREEN}http://localhost:3001/api${NC}"
echo -e "\n${BLUE}📋 Services:${NC}"
echo -e "   • Backend running on port 3001 (PID: $BACKEND_PID)"
echo -e "   • Frontend running on port 3000 (PID: $FRONTEND_PID)"
echo -e "\n${BLUE}💡 First time?${NC}"
echo -e "   1. Open http://localhost:3000 in your browser"
echo -e "   2. Click 'Setup admin'"
echo -e "   3. Create your admin account"
echo -e "   4. Login and start managing content!"
echo -e "\n${BLUE}⛔ To stop services, press Ctrl+C${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}\n"

# Cleanup function
cleanup() {
    echo -e "\n${BLUE}Stopping services...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Services stopped${NC}"
    exit 0
}

# Set trap to cleanup on Ctrl+C
trap cleanup SIGINT

# Wait for both processes
wait

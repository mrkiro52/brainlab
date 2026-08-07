@echo off
REM BrainLab Admin Panel - Quick Start Script for Windows

echo ========================================
echo  BrainLab Admin Panel - Starting...
echo ========================================

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed
    echo Please install from https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js found
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed
    pause
    exit /b 1
)

echo [OK] npm found

REM Install backend dependencies
echo.
echo Installing backend dependencies...
cd backend
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to install backend dependencies
        pause
        exit /b 1
    )
    echo [OK] Backend dependencies installed
) else (
    echo [OK] Backend dependencies already installed
)
cd ..

REM Install frontend dependencies
echo.
echo Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to install frontend dependencies
        pause
        exit /b 1
    )
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)
cd ..

REM Create .env file if it doesn't exist
if not exist "backend\.env" (
    echo.
    echo Creating backend/.env file...
    (
        echo PORT=3001
        echo JWT_SECRET=your-secret-key-change-in-production
        echo NODE_ENV=development
    ) > backend\.env
    echo [OK] Created backend/.env
)

REM Start services
echo.
echo ========================================
echo  Starting Services...
echo ========================================
echo.

REM Start Backend in new window
echo Starting Backend (port 3001)...
cd backend
start "BrainLab Backend" cmd /k npm start
cd ..
timeout /t 2 /nobreak

REM Start Frontend in new window
echo Starting Frontend (port 3000)...
cd frontend
start "BrainLab Frontend" cmd /k npm run dev
cd ..
timeout /t 3 /nobreak

echo.
echo ========================================
echo  BrainLab Admin Panel is running!
echo ========================================
echo.
echo Access the admin panel:
echo   http://localhost:3000
echo.
echo API endpoint:
echo   http://localhost:3001/api
echo.
echo Services:
echo   - Backend running on port 3001
echo   - Frontend running on port 3000
echo.
echo First time?
echo   1. Open http://localhost:3000 in your browser
echo   2. Click 'Setup admin'
echo   3. Create your admin account
echo   4. Login and start managing content!
echo.
echo Press any key to close this window or Ctrl+C to stop...
pause

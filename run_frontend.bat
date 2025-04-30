@echo off
echo Setting up the Face Recognition Frontend...

cd frontend

rem Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing frontend dependencies (this may take a few minutes)...
    npm install
)

echo Starting the frontend development server...
npm start

pause

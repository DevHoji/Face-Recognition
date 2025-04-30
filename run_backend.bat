@echo off
echo Setting up the Face Recognition Backend...

cd backend

rem Check if virtual environment exists, if not create it
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

rem Activate virtual environment and install dependencies
echo Activating virtual environment and installing dependencies...
call venv\Scripts\activate.bat

rem Install packages individually to avoid build issues
echo Installing dependencies (this might take a few minutes)...
pip install --upgrade pip
pip install fastapi
pip install uvicorn
pip install pydantic
pip install python-multipart
pip install sqlalchemy
pip install opencv-python
pip install pillow
pip install aiofiles

echo Starting the backend server...
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

pause

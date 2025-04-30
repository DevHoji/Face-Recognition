# Face Recognition Web App

A full-stack face recognition system built with Python, FastAPI, and React. This application allows users to register their faces, recognize faces from webcam or uploaded images, and manage registered users.

## Features

- **User Registration**: Capture faces using webcam or upload images
- **Face Recognition**: Identify registered users from webcam or image uploads
- **User Management**: View and delete registered users
- **Modern UI**: Clean, responsive interface built with React and Material-UI

## Tech Stack

### Backend
- Python 3.x
- FastAPI
- face_recognition library (built on dlib)
- OpenCV (cv2)
- SQLite
- Uvicorn

### Frontend
- React
- Material-UI
- Axios for API calls
- React Webcam for camera access

## Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

## Running the Application

### Start the Backend Server

1. From the `backend` directory with the virtual environment activated:
   ```
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Start the Frontend Development Server

1. From the `frontend` directory:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

2. The application will be available at [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `POST /users/register`: Register a new user with face
- `POST /users/recognize`: Recognize face from an image
- `GET /users`: List all registered users
- `DELETE /users/{user_id}`: Delete a user

## Usage

1. Navigate to the Register page to add a new user
2. Go to the Recognize page to identify faces
3. View all registered users in the Users page

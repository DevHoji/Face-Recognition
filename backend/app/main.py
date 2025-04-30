from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import os
import uvicorn

from . import models
from .database import engine
from .routers import users

# Create tables in the database
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="Face Recognition API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router)

# Root endpoint
@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <html>
        <head>
            <title>Face Recognition API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    line-height: 1.6;
                }
                h1 {
                    color: #333;
                }
                .endpoint {
                    margin-bottom: 15px;
                    padding: 10px;
                    background-color: #f5f5f5;
                    border-radius: 5px;
                }
                .method {
                    font-weight: bold;
                    margin-right: 10px;
                }
                .post {
                    color: #2e7d32;
                }
                .get {
                    color: #1565c0;
                }
                .delete {
                    color: #c62828;
                }
            </style>
        </head>
        <body>
            <h1>Face Recognition API</h1>
            <p>Welcome to the Face Recognition API. Below are the available endpoints:</p>
            
            <div class="endpoint">
                <span class="method post">POST</span>
                <code>/users/register</code>
                <p>Register a new user with their face</p>
            </div>
            
            <div class="endpoint">
                <span class="method post">POST</span>
                <code>/users/recognize</code>
                <p>Recognize a user from an image</p>
            </div>
            
            <div class="endpoint">
                <span class="method get">GET</span>
                <code>/users</code>
                <p>Get all registered users</p>
            </div>
            
            <div class="endpoint">
                <span class="method delete">DELETE</span>
                <code>/users/{user_id}</code>
                <p>Delete a user</p>
            </div>
            
            <p>For complete API documentation, visit <a href="/docs">/docs</a>.</p>
        </body>
    </html>
    """

if __name__ == "__main__":
    # Run the API with Uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

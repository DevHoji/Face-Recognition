from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from typing import List
import pickle

from .. import models
from ..database import get_db
from ..face_utils import encode_face, recognize_face, serialize_encoding, deserialize_encoding

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(
    name: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Register a new user with their face
    """
    # Read image data
    image_data = await image.read()
    
    # Extract face encoding
    encoding = encode_face(image_data)
    
    if not encoding:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No face detected in the image. Please try again with a clearer image."
        )
    
    # Serialize encoding for database storage
    encoding_bytes = serialize_encoding(encoding)
    
    # Create new user
    new_user = models.User(name=name, face_encoding=encoding_bytes)
    
    # Add to database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": f"User {name} registered successfully", "user_id": new_user.id}

@router.post("/recognize")
async def recognize_user(
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Recognize a user from an image
    """
    # Read image data
    image_data = await image.read()
    
    # Extract face encoding
    encoding = encode_face(image_data)
    
    if not encoding:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No face detected in the image. Please try again with a clearer image."
        )
    
    # Get all users from database
    users = db.query(models.User).all()
    
    if not users:
        return {"message": "No users registered in the system"}
    
    # Get face encodings for all users
    known_encodings = []
    known_users = []
    
    for user in users:
        known_users.append({"id": user.id, "name": user.name})
        known_encodings.append(deserialize_encoding(user.face_encoding))
    
    # Compare face to known encodings
    matches = recognize_face(image_data, known_encodings)
    
    # If any matches found
    if any(matches):
        # Get indices of all matches
        match_indices = [i for i, match in enumerate(matches) if match]
        
        # Return the matched users
        matched_users = [known_users[i] for i in match_indices]
        return {
            "message": "Face recognized",
            "matches": matched_users
        }
    
    return {"message": "No match found", "matches": []}

@router.get("", response_model=List[dict])
def get_users(db: Session = Depends(get_db)):
    """
    Get all registered users
    """
    users = db.query(models.User).all()
    
    return [{"id": user.id, "name": user.name} for user in users]

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID {user_id} not found"
        )
    
    db.delete(user)
    db.commit()
    
    return None

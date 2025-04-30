import numpy as np
import cv2
import pickle
import hashlib
from typing import List, Optional, Tuple

# Since we're removing face_recognition dependency, we'll use a simpler approach
# We'll use image hashes as "encodings" - not as accurate but works without dlib

def encode_face(image_data: bytes) -> Optional[List[float]]:
    """
    Extract face encoding from an image using a simplified method
    that doesn't require face_recognition library
    
    Args:
        image_data: Raw image bytes
        
    Returns:
        Face hash as a list of floats or None if no face detected
    """
    # Convert image from bytes to numpy array
    np_image = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)
    
    # Convert to grayscale for face detection
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Use Haar cascade for face detection (simpler than dlib)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    # If no faces detected, return None
    if len(faces) == 0:
        return None
        
    # Get the first face
    x, y, w, h = faces[0]
    face_img = image[y:y+h, x:x+w]
    
    # Resize to standard size for consistent encoding
    face_img = cv2.resize(face_img, (100, 100))
    
    # Convert to grayscale and flatten to 1D array
    face_gray = cv2.cvtColor(face_img, cv2.COLOR_BGR2GRAY)
    face_flat = face_gray.flatten()
    
    # Normalize values to 0-1 range
    face_flat = face_flat / 255.0
    
    # Convert to list of floats for storage
    return face_flat.tolist()

def recognize_face(image_data: bytes, known_encodings: List[List[float]], tolerance: float = 0.15) -> List[bool]:
    """
    Compare a face in an image to a list of known encodings
    
    Args:
        image_data: Raw image bytes
        known_encodings: List of known face encodings
        tolerance: Maximum allowed difference (lower is more strict)
        
    Returns:
        List of booleans indicating which known encodings match the face
    """
    # Get encoding for input image
    new_encoding = encode_face(image_data)
    
    # If no face detected, return empty list
    if new_encoding is None:
        return []
    
    # Convert list to numpy array for faster comparison
    new_encoding_np = np.array(new_encoding)
    
    # Compare with each known encoding
    matches = []
    for encoding in known_encodings:
        # Calculate mean squared error between encodings
        mse = np.mean((np.array(encoding) - new_encoding_np) ** 2)
        # Match if error is below tolerance threshold
        matches.append(mse < tolerance)
    
    return matches

def serialize_encoding(encoding: List[float]) -> bytes:
    """Serialize face encoding to bytes for database storage"""
    return pickle.dumps(encoding)

def deserialize_encoding(encoding_bytes: bytes) -> List[float]:
    """Deserialize face encoding from bytes stored in database"""
    return pickle.loads(encoding_bytes)

def extract_face_image(image_data: bytes) -> Tuple[Optional[bytes], Optional[List[int]]]:
    """
    Extract the face region from an image
    
    Args:
        image_data: Raw image bytes
        
    Returns:
        Tuple of (face_image_bytes, face_location) or (None, None) if no face detected
    """
    # Convert image from bytes to numpy array
    np_image = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)
    
    # Convert to grayscale for face detection
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Use Haar cascade for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    # If no faces detected, return None
    if len(faces) == 0:
        return None, None
        
    # Get the location of the first face
    x, y, w, h = faces[0]
    
    # Extract face region
    face_image = image[y:y+h, x:x+w]
    
    # Encode face image to JPEG
    _, buffer = cv2.imencode('.jpg', face_image)
    face_image_bytes = buffer.tobytes()
    
    return face_image_bytes, [y, x+w, y+h, x]  # Return in top, right, bottom, left format

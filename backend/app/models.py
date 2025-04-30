from sqlalchemy import Column, Integer, String, LargeBinary
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    face_encoding = Column(LargeBinary, nullable=False)  # Store face encoding as binary data
    created_at = Column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    
    # Optionally, you could add more fields like:
    # email = Column(String, unique=True, nullable=True)
    # image_path = Column(String, nullable=True)  # To store the path to the original image

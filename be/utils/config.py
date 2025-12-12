import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)  # 15 minutes expiry
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI" )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
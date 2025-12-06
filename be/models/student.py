from utils.extensions import db
from datetime import datetime
from werkzeug.security import check_password_hash


class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    photo_profile = db.Column(db.String(255), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    learning_style = db.Column(db.String(50), nullable=True)
    program = db.Column(db.String(120), nullable=True)
    level = db.Column(db.String(50), nullable=False, default="beginer")
    joined_since = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            "photo_profile": self.photo_profile,
            "name": self.name,
            "learning_style": self.learning_style,
            "email": self.email,
            "program": self.program,
            "level": self.level,
            "joined_since": self.joined_since.isoformat() if self.joined_since else None
        }
        
    @staticmethod
    def check_password_hash(password, password_hash):
        return check_password_hash(password_hash, password)
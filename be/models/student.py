from utils.extensions import db, bcrypt
from datetime import datetime

class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    photo_profile = db.Column(db.String(255), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    learning_style = db.Column(db.String(50), nullable=True)
    joined_since = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            "photo_profile": self.photo_profile,
            "name": self.name,
            "learning_style": self.learning_style,
            "email": self.email,
            "joined_since": self.joined_since.isoformat() if self.joined_since else None
        }

    def check_password(self, plain_password):
        return bcrypt.check_password_hash(self.password, plain_password)

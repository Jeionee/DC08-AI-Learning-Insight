from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class Students(db.Model):
    __tablename__ = "students"

    id_student = db.Column(String(5, collation='utf8mb4_general_ci'), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    learning_style = db.Column(db.String(50))
   
    # relationship
    trackings = db.relationship("ModulsTracking", backref="student", lazy=True)
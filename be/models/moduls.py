from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class Moduls(db.Model):
    __tablename__ = "moduls"

    id_moduls = db.Column(String(5, collation='utf8mb4_general_ci'), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(100), nullable=False)
    hour_at_rush = db.Column(db.Integer, nullable=False)

    # relationship
    trackings = db.relationship("ModulsTracking", backref="modul", lazy=True)
from utils.extensions import db
from datetime import datetime
from sqlalchemy import String

class ModulsTracking(db.Model):
    __tablename__ = "moduls_tracking"

    id_moduls_tracking = db.Column(String(5, collation='utf8mb4_general_ci'), primary_key=True)
    status = db.Column(db.String(100), nullable=False)
    completed_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    id_student = db.Column(String(5, collation='utf8mb4_general_ci'),
                           db.ForeignKey("students.id_student"), nullable=False)

    id_moduls = db.Column(String(5, collation='utf8mb4_general_ci'),
                          db.ForeignKey("moduls.id_moduls"), nullable=False)

    status = db.Column(db.String(100), nullable=False)
    completed_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
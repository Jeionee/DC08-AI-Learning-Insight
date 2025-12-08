from utils.extensions import db
from datetime import datetime

class PredictionLog(db.Model):
    __tablename__ = 'prediction_logs'

    id = db.Column(db.Integer, primary_key=True)
    modules_count = db.Column(db.Float, nullable=False)
    avg_minutes = db.Column(db.Float, nullable=False)
    consistency_std = db.Column(db.Float, nullable=False)
    result_label = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'result': self.result_label,
            'created_at': self.created_at
        }
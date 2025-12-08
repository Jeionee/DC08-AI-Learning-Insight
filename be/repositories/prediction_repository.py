from utils.extensions import db
from models.prediction_log import PredictionLog

class PredictionRepository:
    def save_prediction(self, modules, minutes, consistency, result):
        try:
            new_log = PredictionLog(
                modules_count=modules,
                avg_minutes=minutes,
                consistency_std=consistency,
                result_label=result
            )
            db.session.add(new_log)
            db.session.commit()
            return new_log
        except Exception as e:
            db.session.rollback()
            print(f"Error saving to DB: {e}")
            return None
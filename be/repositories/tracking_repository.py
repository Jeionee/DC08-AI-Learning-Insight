from models.tracking import Tracking
from datetime import date

class TrackingRepository:
    @staticmethod
    def get_by_student_id(student_id):
        return Tracking.query.filter_by(developer_id=student_id).first()
    
    @staticmethod
    def get_today_sessions(student_id):
        today = date.today()
        return Tracking.query.filter(
            Tracking.developer_id == student_id,
            Tracking.last_viewed >= today
        ).all()

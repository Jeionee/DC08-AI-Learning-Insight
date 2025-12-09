from models.tracking import Tracking
from datetime import date, timedelta
from sqlalchemy import func
from utils.extensions import db

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
        
    @staticmethod
    def get_sessions_in_range(student_id, start_date, end_date):
        # Fetch tracking sessions between start_date and end_date
        return Tracking.query.filter(
            Tracking.developer_id == student_id,
            Tracking.first_opened_at >= start_date,
            Tracking.last_viewed <= end_date
        ).all()
        
    @staticmethod
    def get_sessions_by_day(student_id, start_date, end_date):
        # Menghitung durasi dalam jam antara first_opened_at dan last_viewed
        return db.session.query(
            func.date(Tracking.first_opened_at).label('date'),
            func.sum(
                (func.timestamp(Tracking.last_viewed) - func.timestamp(Tracking.first_opened_at)) / 3600  # Menghitung durasi dalam jam
            ).label('total_hours')
        ).filter(
            Tracking.developer_id == student_id,
            Tracking.first_opened_at >= start_date,
            Tracking.last_viewed <= end_date
        ).group_by(func.date(Tracking.first_opened_at)).all()
from models.daily_insight import DailyInsight
from utils.extensions import db

class DailyInsightRepository:
    @staticmethod
    def create(student_id, delta, time_spent, goal, learning_style):
        daily = DailyInsight(
            student_id=student_id,
            js_module_progress_delta=delta,
            time_spent_today=time_spent,
            daily_goal=goal,
            learning_style=learning_style
        )
        db.session.add(daily)
        db.session.commit()
        return daily
    
    @staticmethod
    def get_latest_by_student(student_id):
        return DailyInsight.query.filter_by(student_id=student_id).order_by(DailyInsight.created_at.desc()).first()

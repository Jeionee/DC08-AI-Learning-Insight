from models.daily_insight import DailyInsight

class DailyInsightRepository:
    @staticmethod
    def get_latest_by_student(student_id):
        return DailyInsight.query.filter_by(student_id=student_id).order_by(DailyInsight.created_at.desc()).first()

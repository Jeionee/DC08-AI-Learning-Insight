from models.weekly_activity import WeeklyActivity

class WeeklyActivityRepository:
    @staticmethod
    def get_latest_by_student(student_id):
        return WeeklyActivity.query.filter_by(student_id=student_id).order_by(WeeklyActivity.created_at.desc()).first()

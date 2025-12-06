from repositories.daily_insight_repository import DailyInsightRepository
from repositories.weekly_activity_repository import WeeklyActivityRepository

class InsightService:
    @staticmethod
    def get_daily(student_id):
        return DailyInsightRepository.get_latest_by_student(student_id)

    @staticmethod
    def get_weekly(student_id):
        return WeeklyActivityRepository.get_latest_by_student(student_id)

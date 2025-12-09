from repositories.tracking_repository import TrackingRepository
from datetime import date, timedelta, datetime

class TrackingService:
    @staticmethod
    def get_learning_progress(student_id, target_hours=5.0):
        tracking = TrackingRepository.get_by_student_id(student_id)
        if not tracking:
            return None, "Tracking data not found"

        # Hitung durasi belajar (jam)
        elapsed_hours = (tracking.last_viewed - tracking.first_opened_at).total_seconds() / 3600.0

        # Hitung persentase
        progress_percentage = min((elapsed_hours / target_hours) * 100, 100)

        return {
            "student_id": student_id,
            "time_spent_hours": round(elapsed_hours, 2),
            "target_hours": target_hours,
            "percentage": round(progress_percentage, 2)
        }, None

    staticmethod
    def get_learning_progress(student_id, target_hours=5.0):
        sessions = TrackingRepository.get_today_sessions(student_id)
        if not sessions:
            return {
                "student_id": student_id,
                "date": date.today().strftime("%Y-%m-%d"),
                "time_spent_hours": 0.0,
                "target_hours": target_hours,
                "percentage": 0.0
            }, None

        total_hours = sum(
            (s.last_viewed - s.first_opened_at).total_seconds() / 3600.0
            for s in sessions
        )

        progress_percentage = min((total_hours / target_hours) * 100, 100)

        return {
            "student_id": student_id,
            "date": date.today().strftime("%Y-%m-%d"),
            "time_spent_hours": round(total_hours, 2),
            "target_hours": target_hours,
            "percentage": round(progress_percentage, 2)
        }, None

    @staticmethod
    def get_weekly_learning_progress(student_id, target_hours=5.0):
        # Calculate the start and end dates for the past week
        end_date = datetime.today()
        start_date = end_date - timedelta(days=7)
        
        # Fetch tracking data for the past week
        sessions = TrackingRepository.get_sessions_in_range(student_id, start_date, end_date)
        if not sessions:
            return {
                "student_id": student_id,
                "time_spent_hours": 0.0,
                "avg_time_per_day": 0.0,
                "target_met_days": 0,
                "week_change": 0.0
            }, None
        
        total_hours = sum(
            (s.last_viewed - s.first_opened_at).total_seconds() / 3600.0
            for s in sessions
        )
        
        # Calculate average time per day
        avg_time_per_day = total_hours / 7.0
        
        # Calculate how many days the student met the target
        target_met_days = sum(
            (s.last_viewed - s.first_opened_at).total_seconds() / 3600.0 >= target_hours
            for s in sessions
        )
        
        # Fetch the previous week's sessions to calculate the change
        previous_start_date = start_date - timedelta(days=7)
        previous_end_date = start_date
        prev_sessions = TrackingRepository.get_sessions_in_range(student_id, previous_start_date, previous_end_date)
        prev_total_hours = sum(
            (s.last_viewed - s.first_opened_at).total_seconds() / 3600.0
            for s in prev_sessions
        )
        
        # Calculate the change in total hours compared to the previous week
        week_change = total_hours - prev_total_hours
        
        return {
            "student_id": student_id,
            "time_spent_hours": round(total_hours, 2),
            "avg_time_per_day": round(avg_time_per_day, 2),
            "target_met_days": target_met_days,
            "week_change": round(week_change, 2)
        }, None
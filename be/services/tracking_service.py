from repositories.tracking_repository import TrackingRepository

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

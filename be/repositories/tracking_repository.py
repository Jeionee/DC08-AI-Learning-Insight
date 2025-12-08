from models.tracking import Tracking

class TrackingRepository:
    @staticmethod
    def get_by_student_id(student_id):
        return Tracking.query.filter_by(developer_id=student_id).first()

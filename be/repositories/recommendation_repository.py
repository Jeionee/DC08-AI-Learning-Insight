from models.recommendation import Recommendation

class RecommendationRepository:
    @staticmethod
    def get_by_student(student_id):
        return Recommendation.query.filter_by(student_id=student_id).all()

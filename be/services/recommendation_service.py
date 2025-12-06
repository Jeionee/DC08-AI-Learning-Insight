from repositories.recommendation_repository import RecommendationRepository

class RecommendationService:
    @staticmethod
    def get_recommendations(student_id):
        return RecommendationRepository.get_by_student(student_id)

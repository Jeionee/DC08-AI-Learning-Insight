from repositories.quiz_score_repository import QuizScoreRepository

class QuizService:
    @staticmethod
    def get_scores(student_id):
        return QuizScoreRepository.get_by_student(student_id)

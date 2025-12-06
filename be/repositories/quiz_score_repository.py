from models.quiz_score import QuizScore

class QuizScoreRepository:
    @staticmethod
    def get_by_student(student_id):
        return QuizScore.query.filter_by(student_id=student_id).all()

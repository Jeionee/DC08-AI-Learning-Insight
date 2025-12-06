from utils.extensions import db

class QuizScore(db.Model):
    __tablename__ = "quiz_scores"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    course_name = db.Column(db.String(50))
    score = db.Column(db.Integer)

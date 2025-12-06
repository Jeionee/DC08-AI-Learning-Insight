from utils.extensions import db

class Recommendation(db.Model):
    __tablename__ = "recommendations"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    title = db.Column(db.String(150))
    category = db.Column(db.String(50))
    description = db.Column(db.Text)
    progress_percent = db.Column(db.Integer)
    action_label = db.Column(db.String(50))

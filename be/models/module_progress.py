from utils.extensions import db

class ModuleProgress(db.Model):
    __tablename__ = "module_progress"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    progress_percent = db.Column(db.Integer)
    tasks_completed = db.Column(db.Integer)
    tasks_total = db.Column(db.Integer)

    grades = db.relationship("ModuleGrade", backref="module_progress", uselist=False, lazy="select")

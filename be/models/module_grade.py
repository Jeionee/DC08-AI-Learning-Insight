from utils.extensions import db

class ModuleGrade(db.Model):
    __tablename__ = "module_grades"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    module_progress_id = db.Column(db.Integer, db.ForeignKey("module_progress.id"))
    quiz = db.Column(db.Integer)
    assignment = db.Column(db.Integer)
    final_test = db.Column(db.Integer)

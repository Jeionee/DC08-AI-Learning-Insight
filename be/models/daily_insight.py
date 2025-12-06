from utils.extensions import db
from datetime import datetime

class DailyInsight(db.Model):
    __tablename__ = "daily_insights"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    js_module_progress_delta = db.Column(db.Integer)
    time_spent_today = db.Column(db.Integer)
    daily_goal = db.Column(db.Integer)
    learning_style = db.Column(db.String(50))
    created_at = db.Column(db.Date, default=datetime.utcnow)

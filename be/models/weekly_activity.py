from utils.extensions import db
from datetime import datetime

class WeeklyActivity(db.Model):
    __tablename__ = "weekly_activity"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    total_hours = db.Column(db.Float)
    avg_hours_per_day = db.Column(db.Float)
    days_met_goal = db.Column(db.Integer)
    delta_vs_last_week = db.Column(db.String(50))
    created_at = db.Column(db.Date, default=datetime.utcnow)

    daily = db.relationship("WeeklyActivityDaily", backref="weekly_activity", lazy="select")

from utils.extensions import db

class WeeklyActivityDaily(db.Model):
    __tablename__ = "weekly_activity_daily"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    weekly_activity_id = db.Column(db.Integer, db.ForeignKey("weekly_activity.id"))
    day = db.Column(db.String(10))
    hours = db.Column(db.Float)

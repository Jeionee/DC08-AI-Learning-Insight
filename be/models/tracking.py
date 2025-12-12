from utils.extensions import db

class Tracking(db.Model):
    __tablename__ = "trackings"

    id = db.Column(db.Integer, primary_key=True)
    journey_id  = db.Column(db.Integer, nullable=False)
    tutorial_id  = db.Column(db.Integer, nullable=False)
    developer_id = db.Column(db.Integer, nullable=False)
    first_opened_at = db.Column(db.DateTime, nullable=False)
    last_viewed = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "developer_id": self.developer_id,
            "first_opened_at": self.first_opened_at.strftime("%Y-%m-%d %H:%M:%S") if self.first_opened_at else None,
            "last_viewed": self.last_viewed.strftime("%Y-%m-%d %H:%M:%S") if self.last_viewed else None,
        }

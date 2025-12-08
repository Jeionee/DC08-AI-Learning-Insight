from utils.extensions import db

class Tutorial(db.Model):
    __tablename__ = "tutorials"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    developer_journey_id = db.Column(db.BigInteger, nullable=True, index=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "developer_journey_id": self.developer_journey_id,
            "title": self.title,
            "description": self.description
        }
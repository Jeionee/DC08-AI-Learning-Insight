from utils.extensions import db

class Results(db.Model):
    __tablename__ = "results"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    exam_registration_id = db.Column(db.BigInteger, db.ForeignKey("registrations.id"))
    score = db.Column(db.BigInteger, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "exam_registration_id": self.exam_registration_id,
            "score": self.score
        }
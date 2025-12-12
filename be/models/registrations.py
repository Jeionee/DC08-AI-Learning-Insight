from utils.extensions import db

class Registration(db.Model):
    __tablename__ = "registrations"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    examinees_id = db.Column(db.BigInteger, nullable=False, index=True)
    tutorial_id = db.Column(db.BigInteger)
    registration_date = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            "id": self.id,
            "examinees_id": self.examinees_id,
            "tutorial_id": self.tutorial_id,
            "registration_date": str(self.registration_date)
        }
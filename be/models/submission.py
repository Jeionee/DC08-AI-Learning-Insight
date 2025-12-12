from utils.extensions import db
from datetime import datetime


class Submission(db.Model):
    __tablename__ = 'submissions'
    id = db.Column(db.BigInteger, primary_key=True)
    submitter_id = db.Column(db.BigInteger, db.ForeignKey('capstone_db_students.id'))
    journey_id = db.Column(db.BigInteger)
    rating = db.Column(db.BigInteger)
    submission_date = db.Column(db.DateTime)
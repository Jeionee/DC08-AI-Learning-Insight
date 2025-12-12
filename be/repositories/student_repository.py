from models.student import Student
from utils.extensions import db
from models.tracking import Tracking
from models.student import Student
from models.tracking import Tracking
from models.submission import Submission
from models.registrations import Registration

class StudentRepository:
    @staticmethod
    def get_by_email(email):
        return Student.query.filter_by(email=email).first()
    
    @staticmethod
    def get_by_id(student_id):
        return Student.query.get(student_id)

    @staticmethod
    def find_by_email(email):
        return Student.query.filter_by(email=email).first()

    @staticmethod
    def create(name, email, password_hashed):
        student = Student(
            name=name,
            email=email,
            password=password_hashed
        )
        db.session.add(student)
        db.session.commit()
        return student, None
    
    @staticmethod    
    def get_by_student_id(student_id):
        return Tracking.query.filter_by(student_id=student_id).first()
    
    @staticmethod
    def get_student_data(student_id):
        trackings = Tracking.query.filter_by(developer_id=student_id).all()
        submissions = Submission.query.filter_by(submitter_id=student_id).all()
        registrations = Registration.query.filter_by(examinees_id=student_id).all()
        student = Student.query.get(student_id)
        return student, trackings, submissions, registrations
    
    @staticmethod
    def update_learning_style(student_id, style):
        student = Student.query.get(student_id)
        if student:
            student.learning_style = style
            db.session.commit()
            return True
        return False

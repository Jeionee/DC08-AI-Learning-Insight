from models.student import Student
from utils.extensions import db
from models.tracking import Tracking

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
        """
        Ambil data tracking berdasarkan student_id.
        Return object Tracking atau None.
        """
        return Tracking.query.filter_by(student_id=student_id).first()

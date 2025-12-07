from models.student import Student
from utils.extensions import db

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
        try:
            db.session.add(student)
            db.session.commit()
        except Exception as e:
            db.session.rollback()  # Rollback jika terjadi kesalahan
            raise e  # Pastikan exception ini ditangani dengan benar
        return student, None

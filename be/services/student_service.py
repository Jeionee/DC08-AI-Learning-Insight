from repositories.student_repository import StudentRepository
from utils.extensions import bcrypt

class StudentService:
    @staticmethod
    def register(name, email, password):
        existing = StudentRepository.find_by_email(email)
        if existing:
            return None, "Email sudah digunakan"

        password_hashed = bcrypt.generate_password_hash(password).decode("utf-8")
        student = StudentRepository.create(name, email, password_hashed)
        return student, None

    @staticmethod
    def get_profile(student_id):
        return StudentRepository.get_by_id(student_id)

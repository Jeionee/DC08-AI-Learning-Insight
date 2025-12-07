from repositories.student_repository import StudentRepository
from flask_jwt_extended import create_access_token
from datetime import timedelta

class AuthService:
    @staticmethod
    def login(email, password):
        student = StudentRepository.get_by_email(email)

        if not student:
            return None, "Email tidak ditemukan"
        
        if not student.check_password(password):
            return None, "Password salah"

        token = create_access_token(
            identity=str(student.id),
            expires_delta=timedelta(hours=1)
        )

        return token, None

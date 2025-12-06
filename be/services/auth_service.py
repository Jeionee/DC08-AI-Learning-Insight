from repositories.student_repository import StudentRepository
from datetime import datetime, timedelta
import jwt as pyjwt

class AuthService:
    @staticmethod
    def login(email, password):
        student = StudentRepository.get_by_email(email)

        if not student:
            return None, "Email tidak ditemukan"
        
        if not student.check_password(password):
            return None, "Password salah"

        token = pyjwt.encode({
            "id": student.id,
            "email": student.email,
            "exp": datetime.utcnow() + timedelta(hours=1)
        }, "SECRET_KEY", algorithm="HS256")
        
        return token, None

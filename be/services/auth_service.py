from repositories.student_repository import StudentRepository
from utils.extensions import jwt
from werkzeug.security import check_password_hash
from datetime import datetime
import jwt as pyjwt

class AuthService:
    @staticmethod
    def login(email, password):
        student = StudentRepository.get_by_email(email)

        if not student:
            return None, "Email tidak ditemukan"
        
        if not student.check_password_hash(password, student.password):
            return None, "Password salah"

        # Membuat JWT token
        token = pyjwt.encode({
            "id": student.id,
            "email": student.email,
            "exp": datetime.utcnow() + timedelta(hours=1)
        }, "SECRET_KEY", algorithm="HS256")
        
        return token, None

from repositories.student_repository import StudentRepository
from flask_jwt_extended import create_access_token

class AuthService:
    @staticmethod
    def login(email, password):
        student = StudentRepository.get_by_email(email)

        if not student:
            return None, "Email tidak ditemukan"
        
        if not student.check_password(password):
            return None, "Password salah"

        token = create_access_token(
            identity=student.id,
            additional_claims={"email": student.email}
        )

        return token, None

import logging
from repositories.student_repository import StudentRepository
from utils.extensions import bcrypt

class StudentService:
    @staticmethod
    def register(name, email, password):
        logging.debug(f"Registering student with email: {email}")
        
        # Cek apakah email sudah ada
        existing = StudentRepository.find_by_email(email)
        if existing:
            logging.debug(f"Email {email} already exists")
            return None, "Email sudah digunakan"
        
        # Hash password
        password_hashed = bcrypt.generate_password_hash(password).decode("utf-8")
        
        # Coba buat user
        try:
            student, error = StudentRepository.create(name, email, password_hashed)
            if error:
                logging.error(f"Error during student creation: {error}")
                return None, error
        except Exception as e:
            logging.error(f"Error during student creation: {str(e)}")
            return None, "Internal Server Error"
        
        logging.debug(f"Student created successfully: {student.id}")
        return student, None

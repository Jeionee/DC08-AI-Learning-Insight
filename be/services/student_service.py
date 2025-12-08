import logging
from repositories.student_repository import StudentRepository
from utils.extensions import bcrypt
from datetime import datetime

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

    @staticmethod
    def get_profile(student_id):
        # Ambil data student berdasarkan ID
        return StudentRepository.get_by_id(student_id)
    
    @staticmethod
    def get_learning_progress(student_id, target_hours=5.0):
        # Ambil data tracking berdasarkan student_id
        tracking = StudentRepository.get_by_student_id(student_id)
        if not tracking:
            return None, "Tracking data not found"
        
        # Konversi datetime
        fmt = "%Y-%m-%d %H:%M:%S"
        first_dt = datetime.strptime(tracking.first_opened_at, fmt)
        last_dt = datetime.strptime(tracking.last_viewed, fmt)

        # Hitung durasi belajar (jam)
        elapsed_hours = (last_dt - first_dt).total_seconds() / 3600.0

        # Hitung persentase terhadap target
        progress_percentage = min((elapsed_hours / target_hours) * 100, 100)

        return {
            "elapsed_hours": elapsed_hours,
            "target_hours": target_hours,
            "progress_percentage": progress_percentage
        }, None
from flask import jsonify
from . import students_bp
from services.student_service import StudentService
from flask_jwt_extended import jwt_required, get_jwt_identity

@students_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        # Ambil student_id dari JWT token
        student_id = get_jwt_identity()
        
        # Validasi bahwa identity adalah integer
        if not student_id:
            return jsonify({"message": "Invalid token"}), 401
            
        # Convert ke integer jika perlu (tergantung bagaimana identity disimpan)
        try:
            student_id = int(student_id)
        except ValueError:
            return jsonify({"message": "Invalid student ID in token"}), 401

        # Ambil data student berdasarkan ID dari JWT
        student = StudentService.get_profile(student_id)

        if not student:
            return jsonify({"message": "Student not found"}), 404

        # Mengembalikan data student dalam format JSON
        return jsonify(student.to_dict()), 200

    except Exception as e:
        # Tangani error jika terjadi
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
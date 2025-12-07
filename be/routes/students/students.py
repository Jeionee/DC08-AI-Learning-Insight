from flask import jsonify
from . import students_bp
from services.student_service import StudentService
from flask_jwt_extended import jwt_required

@students_bp.route("/<int:student_id>", methods=["GET"])
@jwt_required()
def get_profile(student_id):
    try:
        # Ambil data student berdasarkan ID
        student = StudentService.get_profile(student_id)

        if not student:
            return jsonify({"message": "Student not found"}), 404

        # Mengembalikan data student dalam format JSON
        return jsonify(student.to_dict()), 200

    except Exception as e:
        # Tangani error jika terjadi
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

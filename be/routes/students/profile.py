from flask import jsonify
from . import students_bp
from services.student_service import StudentService
from flask_jwt_extended import jwt_required, get_jwt_identity

@students_bp.route("/<int:student_id>", methods=["GET"])
def get_profile(student_id):
    try:
        student = StudentService.get_profile(student_id)

        if not student:
            return jsonify({"message": "Student not found"}), 404

        # Jika semuanya berhasil, kembalikan data student
        return jsonify(student.to_dict()), 200

    except Exception as e:
        # Jika terjadi error, tangkap dan beri response error
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

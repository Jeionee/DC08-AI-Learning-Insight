from flask import jsonify
from . import students_bp
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.student_service import StudentService

@students_bp.route("/me", methods=["GET"])
@jwt_required()
def get_profile():
    student_id = get_jwt_identity()
    student = StudentService.get_profile(student_id)
    
    if not student:
        return jsonify({"message": "Student not found"}), 404

    return jsonify(student.to_dict()), 200
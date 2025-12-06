from flask import jsonify
from . import students_bp
from services.student_service import StudentService

@students_bp.route("/<int:student_id>", methods=["GET"])
def get_profile(student_id):
    student = StudentService.get_profile(student_id)
    if not student:
        return jsonify({"message": "Student not found"}), 404
    return jsonify(student.to_dict()), 200

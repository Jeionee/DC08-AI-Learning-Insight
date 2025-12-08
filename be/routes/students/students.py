from flask import jsonify
from . import students_bp
from services.student_service import StudentService
from services.tracking_service import TrackingService
from flask_jwt_extended import jwt_required, get_jwt_identity

@students_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        student_id = get_jwt_identity()
        if not student_id:
            return jsonify({"message": "Invalid token"}), 401

        try:
            student_id = int(student_id)
        except ValueError:
            return jsonify({"message": "Invalid student ID in token"}), 401

        student = StudentService.get_profile(student_id)
        if not student:
            return jsonify({"message": "Student not found"}), 404

        return jsonify(student.to_dict()), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@students_bp.route("/learning-progress", methods=["GET"])
@jwt_required()
def get_learning_progress():
    try:
        student_id = get_jwt_identity()
        if not student_id:
            return jsonify({"message": "Invalid token"}), 401

        try:
            student_id = int(student_id)
        except ValueError:
            return jsonify({"message": "Invalid student ID in token"}), 401

        progress, error = TrackingService.get_learning_progress(student_id)
        if error:
            return jsonify({"message": error}), 404

        return jsonify(progress), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

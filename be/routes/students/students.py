from flask import jsonify,request
from . import students_bp
from services.student_service import StudentService
from services.tracking_service import TrackingService
from services.results_service import ResultsService
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
    
@students_bp.route("/quiz-results", methods=["GET"])
@jwt_required()
def get_quiz_results():
    try:
        student_id = get_jwt_identity()
        if not student_id:
            return jsonify({"message": "Invalid token"}), 401
        try:
            student_id = int(student_id)
        except ValueError:
            return jsonify({"message": "Invalid student ID in token"}), 401

        journey_id = request.args.get("journey_id")
        tutorial_id = request.args.get("tutorial_id")
        try:
            limit = int(request.args.get("limit", 50))
            offset = int(request.args.get("offset", 0))
        except ValueError:
            return jsonify({"message": "Invalid pagination parameters"}), 400

        journey_id = int(journey_id) if journey_id else None
        tutorial_id = int(tutorial_id) if tutorial_id else None

        results, err = ResultsService.fetch_results_for_student(student_id, journey_id=journey_id, tutorial_id=tutorial_id, limit=limit, offset=offset)
        if err:
            return jsonify({"message": f"Error fetching results: {err}"}), 500

        aggregate = request.args.get("aggregate", "false").lower() == "true"
        agg = None
        if aggregate:
            agg, err2 = ResultsService.fetch_aggregates_for_student(student_id, journey_id=journey_id)
            if err2:
                return jsonify({"message": f"Error fetching aggregate: {err2}"}), 500

        resp = {"results": results}
        if aggregate:
            resp["aggregate_by_tutorial"] = agg

        return jsonify(resp), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
    
@students_bp.route("/weekly-progress", methods=["GET"])
@jwt_required()
def get_weekly_progress():
    try:
        student_id = get_jwt_identity()
        if not student_id:
            return jsonify({"message": "Invalid token"}), 401

        try:
            student_id = int(student_id)
        except ValueError:
            return jsonify({"message": "Invalid student ID in token"}), 401

        progress, error = TrackingService.get_weekly_learning_progress(student_id)
        if error:
            return jsonify({"message": error}), 404

        return jsonify(progress), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@students_bp.route("/daily-progress", methods=["GET"])
@jwt_required()
def get_daily_progress():
    try:
        student_id = get_jwt_identity()
        if not student_id:
            return jsonify({"message": "Invalid token"}), 401

        try:
            student_id = int(student_id)
        except ValueError:
            return jsonify({"message": "Invalid student ID in token"}), 401

        progress, error = TrackingService.get_daily_learning_progress(student_id)
        if error:
            return jsonify({"message": error}), 404

        return jsonify(progress), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

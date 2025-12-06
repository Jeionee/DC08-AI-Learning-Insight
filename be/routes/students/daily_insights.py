from flask import jsonify, request
from . import students_bp
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.insight_service import InsightService

@students_bp.route("/activity/today", methods=["GET"])
@jwt_required()
def get_daily_insight():
    student_id = get_jwt_identity()
    insight = InsightService.get_daily(student_id)
    
    if not insight:
        return jsonify({"message": "No daily insight found"}), 404

    return jsonify({
        "js_module_progress_delta": insight.js_module_progress_delta,
        "time_spent_today": insight.time_spent_today,
        "daily_goal": insight.daily_goal,
        "learning_style": insight.learning_style
    }), 200


@students_bp.route("/activity/today", methods=["POST"])
@jwt_required()
def create_daily_insight():
    student_id = get_jwt_identity()
    data = request.get_json()

    delta = data.get("js_module_progress_delta")
    time_spent = data.get("time_spent_today")
    goal = data.get("daily_goal")
    learning_style = data.get("learning_style")

    if delta is None or time_spent is None or goal is None:
        return jsonify({"message": "Missing required fields"}), 400

    insight = InsightService.create_daily(
        student_id, delta, time_spent, goal, learning_style
    )

    return jsonify({
        "message": "Daily insight created successfully",
        "data": {
            "id": insight.id,
            "student_id": insight.student_id,
            "js_module_progress_delta": insight.js_module_progress_delta,
            "time_spent_today": insight.time_spent_today,
            "daily_goal": insight.daily_goal,
            "learning_style": insight.learning_style,
            "created_at": str(insight.created_at)
        }
    }), 201
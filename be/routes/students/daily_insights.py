from flask import jsonify
from . import students_bp
from services.insight_service import InsightService

@students_bp.route("/<int:student_id>/activity/today", methods=["GET"])
def get_daily_insight(student_id):
    insight = InsightService.get_daily(student_id)
    if not insight:
        return jsonify({"message": "No daily insight found"}), 404

    return jsonify({
        "js_module_progress_delta": insight.js_module_progress_delta,
        "time_spent_today": insight.time_spent_today,
        "daily_goal": insight.daily_goal,
        "learning_style": insight.learning_style
    }), 200

from flask import jsonify
from . import students_bp
from services.insight_service import InsightService

@students_bp.route("/<int:student_id>/activity/weekly", methods=["GET"])
def get_weekly_activity(student_id):
    wa = InsightService.get_weekly(student_id)
    if not wa:
        return jsonify({"message": "No weekly activity found"}), 404

    daily_breakdown = []
    for d in wa.daily:
        daily_breakdown.append({"day": d.day, "hours": d.hours})

    return jsonify({
        "total_hours": wa.total_hours,
        "avg_hours_per_day": wa.avg_hours_per_day,
        "days_met_goal": wa.days_met_goal,
        "delta_vs_last_week": wa.delta_vs_last_week,
        "daily_breakdown": daily_breakdown
    }), 200
from flask import jsonify
from . import students_bp
from services.recommendation_service import RecommendationService

@students_bp.route("/<int:student_id>/recommendations", methods=["GET"])
def get_recommendations(student_id):
    recs = RecommendationService.get_recommendations(student_id)
    if not recs:
        return jsonify([]), 200

    out = []
    for r in recs:
        out.append({
            "title": r.title,
            "category": r.category,
            "description": r.description,
            "progress_percent": r.progress_percent,
            "action_label": r.action_label
        })
    return jsonify(out), 200
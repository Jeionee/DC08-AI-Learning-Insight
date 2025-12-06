from flask import jsonify
from . import students_bp
from services.quiz_service import QuizService

@students_bp.route("/<int:student_id>/quiz-scores", methods=["GET"])
def get_quiz_scores(student_id):
    scores = QuizService.get_scores(student_id)
    if not scores:
        return jsonify({"scores": {}, "highest_course": None, "needs_improvement": None}), 200

    scores_map = {}
    highest_score = -1
    highest_course = None
    lowest_score = 101
    needs_improvement = None

    for s in scores:
        scores_map[s.course_name] = s.score
        if s.score > highest_score:
            highest_score = s.score
            highest_course = s.course_name
        if s.score < lowest_score:
            lowest_score = s.score
            needs_improvement = s.course_name

    return jsonify({
        "scores": scores_map,
        "highest_course": highest_course,
        "needs_improvement": needs_improvement
    }), 200

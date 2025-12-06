from flask import jsonify
from . import students_bp
from services.module_service import ModuleService

@students_bp.route("/<int:student_id>/modules/progress", methods=["GET"])
def get_module_progress(student_id):
    mp = ModuleService.get_module_progress(student_id)
    if not mp:
        return jsonify({"message": "No module progress found"}), 404

    grades = None
    if mp.grades:
        grades = {
            "quiz": mp.grades.quiz,
            "assignment": mp.grades.assignment,
            "final_test": mp.grades.final_test
        }

    return jsonify({
        "progress_percent": mp.progress_percent,
        "tasks_completed": mp.tasks_completed,
        "tasks_total": mp.tasks_total,
        "grades": grades
    }), 200
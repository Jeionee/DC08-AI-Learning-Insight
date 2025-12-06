from flask import Blueprint

students_bp = Blueprint("students", __name__, url_prefix="/api/students")

from . import prediction, profile, daily_insights, weekly_activity, quiz_scores, recommendations, modules 
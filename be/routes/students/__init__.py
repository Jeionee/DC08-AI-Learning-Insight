from flask import Blueprint

students_bp = Blueprint("students", __name__, url_prefix="/api/students")

# import route modules to register routes on the blueprint
from . import profile, daily_insights, weekly_activity, quiz_scores, recommendations, modules  # noqa: F401

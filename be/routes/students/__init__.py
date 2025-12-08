from flask import Blueprint

students_bp = Blueprint("students_bp", __name__, url_prefix="/api/students")


from . import students
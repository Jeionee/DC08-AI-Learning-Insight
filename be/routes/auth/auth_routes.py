from flask import Blueprint, request, jsonify
from services.student.student_service import login_student
from services.student.student_service import register_student

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    return login_student(email, password)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")

    return register_student(email, password, name)
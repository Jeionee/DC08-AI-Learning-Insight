from flask import Blueprint, request, jsonify
from services.student_service import StudentService
from services.auth_service import AuthService

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    token, error = AuthService.login(data.get("email"), data.get("password"))

    if error:
        return jsonify({"message": error}), 400

    return jsonify({"message": "Login berhasil", "token": token}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "name, email, password wajib diisi"}), 400

    student, error = StudentService.register(name, email, password)

    if error:
        return jsonify({"message": error}), 400

    return jsonify({
        "message": "Register berhasil",
        "data": {
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "level": student.level,
            "joined_since": str(student.joined_since)
        }
    }), 201
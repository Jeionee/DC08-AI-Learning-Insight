from utils.security import hash_password, verify_password
from repositories.auth_repository import get_student_by_email
from repositories.auth_repository import create_student
from flask_jwt_extended import create_access_token
from datetime import timedelta

def register_student(email, password, name):
    if get_student_by_email(email):
        return {"error": "Email already exists"}, 400
    
    hashed_password = hash_password(password)
    create_student(name, email, hashed_password)
    return {"message": "User registered successfully"}, 201

def login_student(email, password):
    user = get_student_by_email(email)

    if not user or not verify_password(password, user.password):
        return {"msg": "Invalid email or password"}, 401
    
    token = create_access_token(
        identity=str(user.id_student),
        expires_delta=timedelta(hours=1)
    )

    return {
        "msg": "Login Berhasil",
        "token": token,
    }, 200
from utils.extensions import db
from models.students import Students
import string
import random

def get_student_by_email(email):
    return Students.query.filter(Students.email == email).first()

def generate_unique_id(length=5):
    characters = string.ascii_uppercase + string.digits
    while True:
        new_id = ''.join(random.choice(characters) for _ in range(length))
        
        if not Students.query.get(new_id):
            return new_id

def get_student_by_id(id_student):
    return Students.query.filter(Students.id_student == id_student).first()

def create_student(name, email, password_hash, learning_style=None):
    student_id = generate_unique_id(5)
    student = Students(
        id_student=student_id,
        name=name,
        email=email,
        password=password_hash,
        learning_style=learning_style
    )
    db.session.add(student)
    db.session.commit()
    return student

from flask import Blueprint, jsonify
from services.prediction_service import PredictionService
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.student_service import StudentService

predict_bp = Blueprint("predict_bp", __name__, url_prefix="/api")

@predict_bp.route("/predict", methods=["POST"])
@jwt_required()
def predict_learning_style():
    student_id = get_jwt_identity()
    result = PredictionService.predict(student_id)
    
    if result == "Student not found":
        return jsonify({"message": f"Student with ID {student_id} not found"}), 404
    
    if result == "Model_Not_Loaded":
         return jsonify({"message": "Error: Machine Learning Model could not be loaded"}), 500

    return jsonify({
        "student_id": student_id,
        "new_learning_style": result,
        "message": "Learning style successfully predicted and updated in the database."
    }), 200
        

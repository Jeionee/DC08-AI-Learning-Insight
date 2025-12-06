from flask import Blueprint, request, jsonify
from services.prediction_service import PredictionService

predict_bp = Blueprint("predict_bp", __name__, url_prefix="/api")

@predict_bp.route("/predict", methods=["POST"])
def predict_learning_style():
    data = request.get_json()

    result, error = PredictionService.predict(data)

    if error:
        return jsonify({"message": error}), 400

    return jsonify({
        "learning_style": result
    }), 200
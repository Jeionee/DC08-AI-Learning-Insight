from flask import Blueprint, request, jsonify
from services.prediction.prediction_service import LearningService

predict_bp = Blueprint('predict', __name__, url_prefix='/api/predict')

learning_service = LearningService() 

@predict_bp.route('/learning-style', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        result = learning_service.predict_student_style(data)

        return jsonify({
            'status': 'success',
            'data': result
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.analytics_data import fetch_student_analytics
from services.ai_engine import generate_recommendations_from_ai


# Buat Blueprint
recom_bp = Blueprint('recommendation', __name__)


@recom_bp.route('/api/recommendation', methods=['GET'])
@jwt_required()  # Pastikan user login
def get_ai_recommendation():
    current_user_id = get_jwt_identity()  # Ambil ID dari token JWT

    # 1. Ambil Data
    stats = fetch_student_analytics(current_user_id)

    if not stats:
        return jsonify({"message": "Belum ada data aktivitas belajar."}), 404

    # 2. Proses AI
    ai_result = generate_recommendations_from_ai(stats)

    return jsonify(ai_result), 200
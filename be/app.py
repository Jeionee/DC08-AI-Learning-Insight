from flask import Flask, jsonify
from utils.extensions import db, bcrypt, jwt, migrate
from routes.auth.auth_routes import auth_bp
from routes.students import students_bp
from routes.prediction import predict_bp
# 1. Import Blueprint Rekomendasi di sini (Top Level)
from routes.recommendation_routes import recom_bp
from flask_cors import CORS
from utils.config import Config


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Handle JWT errors
    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify(msg="Unauthorized: Token tidak ditemukan"), 401

    @jwt.expired_token_loader
    def expired_callback(jwt_header, jwt_payload):
        return jsonify(msg="Token expired"), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify(msg="Unauthorized: Token invalid"), 422

    # Register Blueprints
    # Pastikan mendaftarkan blueprint DI DALAM fungsi create_app
    app.register_blueprint(auth_bp)
    app.register_blueprint(students_bp)
    app.register_blueprint(predict_bp)
    
    # 2. Daftarkan Blueprint Rekomendasi DI SINI (Di dalam fungsi)
    app.register_blueprint(recom_bp)

    # Create database tables
    with app.app_context():
        db.create_all()
        pass
    return app
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=False)

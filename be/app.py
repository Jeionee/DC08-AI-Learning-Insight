from flask import Flask, jsonify
from utils.config import Config
from utils.extensions import db, bcrypt, jwt, migrate
from routes.auth.auth_routes import auth_bp
from routes.prediction.prediction import predict_bp
from routes.students import students_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    @jwt.unauthorized_loader
    def unauthorized_callback(eror):
        return jsonify(msg="Unauthorized: Token tidak ditemukan"), 401

    @jwt.expired_token_loader
    def expired_callback(jwt_header, jwt_payload):
         return jsonify(msg="Token expired"), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify(msg="Unauthorized: Token invalid"), 422

    app.register_blueprint(predict_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(students_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

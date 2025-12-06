from flask import Flask, jsonify
from utils.config import Config
from utils.extensions import db, bcrypt, jwt, migrate
from routes.auth.auth_routes import auth_bp
from routes.students import students_bp
from routes.prediction_routes import predict_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
       
    print("SECRET:", app.config["SECRET_KEY"])
    print("JWT SECRET:", app.config["JWT_SECRET_KEY"])

    CORS(app)

    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    
    print("JWT_MANAGER SECRET USED:", app.config.get("JWT_SECRET_KEY"))


    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify(msg="Unauthorized: Token tidak ditemukan"), 401

    @jwt.expired_token_loader
    def expired_callback(jwt_header, jwt_payload):
         return jsonify(msg="Token expired"), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify(msg="Unauthorized: Token invalid"), 422

    app.register_blueprint(auth_bp)
    app.register_blueprint(students_bp)
    app.register_blueprint(predict_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

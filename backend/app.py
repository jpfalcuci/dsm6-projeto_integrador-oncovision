from flask import Flask
from flask_cors import CORS
from utils.config import ALLOWED_ORIGINS
from routes.auth_routes import auth_bp
from routes.predict_routes import predict_bp
from routes.history_routes import history_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

# Registrar blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(predict_bp)
app.register_blueprint(history_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

from flask import Blueprint, request, jsonify
from services.auth_service import verify_hash
from services.predict_service import predict
from services.history_service import save_prediction

predict_bp = Blueprint('predict', __name__)


@predict_bp.route('/predict', methods=['POST'])
def make_prediction():
    content = request.get_json()
    username = content.get('username')
    hash_sent = content.get('hash')
    input_data = content.get('data')

    if not username or not hash_sent or not input_data:
        return jsonify({'error': 'Parametros ausentes'}), 400

    if not verify_hash(username, hash_sent):
        return jsonify({'error': 'Hash invalido'}), 401

    try:
        result = predict(input_data)
        label = "Benigno" if result == 1 else "Maligno"

        save_prediction(username, input_data, label)

        return jsonify({'prediction': label})
    except Exception as e:
        return jsonify({'error': f'Erro na predicao: {str(e)}'}), 500

from flask import Blueprint, request, jsonify
from services.auth_service import verify_hash
from services.db_service import load_db, save_db
from services.predict_service import predict

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

        db = load_db()
        db.setdefault('history', {}).setdefault(username, []).append({
            'input': input_data,
            'prediction': label
        })
        save_db(db)

        return jsonify({'prediction': label})
    except Exception as e:
        return jsonify({'error': f'Erro na predicao: {str(e)}'}), 500

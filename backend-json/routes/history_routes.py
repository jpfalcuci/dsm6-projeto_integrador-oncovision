from flask import Blueprint, request, jsonify
from services.auth_service import verify_hash
from services.db_service import load_db

history_bp = Blueprint('history', __name__)

@history_bp.route('/history/<username>', methods=['GET'])
def get_history(username):
    hash_sent = request.args.get('hash')

    if not hash_sent:
        return jsonify({'error': 'Hash nao fornecido'}), 400

    if not verify_hash(username, hash_sent):
        return jsonify({'error': 'Hash invalido'}), 401

    db = load_db()
    history = db.get('history', {}).get(username, [])
    return jsonify({'history': history})

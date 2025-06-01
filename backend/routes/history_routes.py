from flask import Blueprint, request, jsonify
from services.auth_service import verify_hash
from services.history_service import get_history

history_bp = Blueprint('history', __name__)


@history_bp.route('/history/<username>', methods=['GET'])
def history(username):
    hash_sent = request.args.get('hash')

    if not hash_sent:
        return jsonify({'error': 'Hash nao fornecido'}), 400

    if not verify_hash(username, hash_sent):
        return jsonify({'error': 'Hash invalido'}), 401

    history = get_history(username)
    return jsonify({'history': history})

from flask import Blueprint, request, jsonify
from services.auth_service import (
    hash_password,
    generate_user_hash,
    create_user,
    get_user_by_username
)

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username e senha são obrigatorios'}), 400

    existing_user = get_user_by_username(username)
    if existing_user:
        return jsonify({'message': 'Usuario ja existe.'}), 409

    create_user(username, password)

    return jsonify({'message': 'Usuario registrado com sucesso.'})


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username e senha sao obrigatorios'}), 400

    user = get_user_by_username(username)
    if not user:
        return jsonify({'message': 'Credenciais invalidas'}), 401

    if user['password_hash'] != hash_password(password):
        return jsonify({'message': 'Credenciais invalidas'}), 401

    user_hash = generate_user_hash(username, user['password_hash'])
    return jsonify({'message': 'Login bem-sucedido.', 'hash': user_hash})

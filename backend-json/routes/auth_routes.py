from flask import Blueprint, request, jsonify
from services.auth_service import hash_password, generate_user_hash
from services.db_service import load_db, save_db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username e senha sao obrigatorios.'}), 400

    db = load_db()
    users = db.get('users', {})

    if username in users:
        return jsonify({'message': 'Usuario ja existe.'}), 400

    users[username] = hash_password(password)
    db['users'] = users
    db.setdefault('history', {})[username] = []
    save_db(db)

    return jsonify({'message': 'Usuario registrado com sucesso.'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username e senha sao obrigatorios.'}), 400

    db = load_db()
    users = db.get('users', {})

    if username not in users or users[username] != hash_password(password):
        return jsonify({'message': 'Credenciais invalidas.'}), 401

    user_hash = generate_user_hash(username, users[username])
    return jsonify({'message': 'Login bem-sucedido.', 'hash': user_hash})

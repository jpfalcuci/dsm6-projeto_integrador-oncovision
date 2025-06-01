import hashlib
from services.db_service import load_db

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_user_hash(username, password_hash):
    return hashlib.sha256((username + password_hash).encode()).hexdigest()

def verify_hash(username, hash_sent):
    db = load_db()
    users = db.get('users', {})
    if username not in users:
        return False
    expected_hash = generate_user_hash(username, users[username])
    return expected_hash == hash_sent

import hashlib
from services.db_service import execute_query


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


def generate_user_hash(username, password_hash):
    return hashlib.sha256((username + password_hash).encode()).hexdigest()


def create_user(username, password):
    password_hash = hash_password(password)
    query = """
        INSERT INTO users (username, password_hash)
        VALUES (%s, %s)
        RETURNING id;
    """
    result = execute_query(query, (username, password_hash), fetchone=True)
    return result['id'] if result else None


def get_user_by_username(username):
    query = "SELECT * FROM users WHERE username = %s;"
    user = execute_query(query, (username,), fetchone=True)
    return user


def verify_hash(username, hash_sent):
    user = get_user_by_username(username)
    if not user:
        return False
    expected_hash = generate_user_hash(username, user['password_hash'])
    return expected_hash == hash_sent

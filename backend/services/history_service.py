from services.db_service import execute_query
from services.auth_service import get_user_by_username


def save_prediction(username, input_data, prediction):
    user = get_user_by_username(username)
    if not user:
        raise Exception('Usuário não encontrado.')

    query = """
        INSERT INTO predictions (
            user_id, mean_radius, mean_texture, mean_perimeter, mean_area, mean_smoothness, prediction
        ) VALUES (%s, %s, %s, %s, %s, %s, %s);
    """
    params = (
        user['id'],
        input_data['mean_radius'],
        input_data['mean_texture'],
        input_data['mean_perimeter'],
        input_data['mean_area'],
        input_data['mean_smoothness'],
        prediction
    )
    execute_query(query, params)


def get_history(username):
    user = get_user_by_username(username)
    if not user:
        return []

    query = """
        SELECT 
            mean_radius, mean_texture, mean_perimeter, mean_area, mean_smoothness, prediction, timestamp
        FROM predictions
        WHERE user_id = %s
        ORDER BY timestamp DESC;
    """
    return execute_query(query, (user['id'],), fetch=True)

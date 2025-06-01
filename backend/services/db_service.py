import os
import json
from utils.config import DB_PATH

def load_db():
    if not os.path.exists(DB_PATH):
        with open(DB_PATH, 'w') as f:
            json.dump({}, f)
    with open(DB_PATH, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_db(data):
    with open(DB_PATH, 'w') as f:
        json.dump(data, f, indent=2)

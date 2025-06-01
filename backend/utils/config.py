from dotenv import load_dotenv
import os

load_dotenv()

# Caminhos dos modelos
MODEL_PATH = os.getenv('MODEL_PATH')
SCALER_PATH = os.getenv('SCALER_PATH')

DB_CONFIG = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': int(os.getenv('DB_PORT'))
}

# CORS
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS').split(',')

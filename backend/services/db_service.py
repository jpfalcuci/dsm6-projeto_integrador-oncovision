import psycopg2
from psycopg2.extras import RealDictCursor
from utils.config import DB_CONFIG


def get_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    return conn


def execute_query(query, params=None, fetch=False, fetchone=False):
    conn = get_connection()
    try:
        with conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, params)
                if fetch:
                    return cur.fetchall()
                if fetchone:
                    return cur.fetchone()
                conn.commit()
    finally:
        conn.close()

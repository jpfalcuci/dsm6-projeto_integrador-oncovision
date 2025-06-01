CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    mean_radius REAL NOT NULL,
    mean_texture REAL NOT NULL,
    mean_perimeter REAL NOT NULL,
    mean_area REAL NOT NULL,
    mean_smoothness REAL NOT NULL,
    prediction TEXT CHECK (prediction IN ('Benigno', 'Maligno')) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

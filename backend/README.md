# Backend PostgreSQL

## Informações

Backend para o PI OncoVision, desenvolvido em Python com Flask e. O backend é responsável por gerenciar o cadastro de usuários, autenticação e previsões de câncer de mama utilizando um modelo de machine learning.

## Instalação

1. Instale o PostgreSQL e crie um banco de dados chamado `onco_vision`:
2. Crie a tabela `users` e `predictions` no banco de dados:

```sql
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
```

## Configure o arquivo `utils/config.py` com as informações do seu banco de dados:

```python
DB_CONFIG = {
    'dbname': 'oncovision',
    'user': 'SEU_USUARIO',
    'password': 'SUA_SENHA',
    'host': 'localhost',
    'port': 5432
}
```

## Inicie o servidor:

```bash
python app.py
```

## Teste o servidor:

1. Cadastrar um novo usuário:

```curl
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username": "clara", "password": "123456"}'
```

2. Fazer login:

```curl
curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{"username": "clara", "password": "123456"}'
```

3. Fazer uma previsão:

```curl
curl -X POST http://localhost:5000/predict -H "Content-Type: application/json" -d '{"username": "clara", "hash": "<HASHCODEAQUI>", "data": {"mean_radius": 14.5, "mean_texture": 20.0, "mean_perimeter": 95.5, "mean_area": 600.2, "mean_smoothness": 0.12} }'
```

> Resposta esperada:
>
> ```json
> {
>     "prediction": "Maligno"
> }
> ```

```curl
curl -X POST http://localhost:5000/predict -H "Content-Type: application/json" -d '{"username": "clara", "hash": "<HASHCODEAQUI>", "data": {"mean_radius": 13.8, "mean_texture": 15.7, "mean_perimeter": 85.63, "mean_area": 520.2, "mean_smoothness": 0.10} }'
```

> Resposta esperada:
>
> ```json
> {
>     "prediction": "Benigno"
> }
> ```

4. Listar previsões:

```curl
curl -X GET "http://localhost:5000/history/clara?hash=<HASHCODEAQUI>"
```

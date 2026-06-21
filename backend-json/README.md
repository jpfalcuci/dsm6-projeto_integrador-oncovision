# Backend local (json)

## Informações

Backend provisório para auxiliar no desenvolvimento do frontend.

## Instalação

1. Instale o Flask:

```bash
pip install Flask
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

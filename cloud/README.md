# 🏥 OncoVision Backend Deployment - Azure Ubuntu

## 📄 Descrição
Projeto de backend para previsão de câncer de mama, implementado em Flask e PostgreSQL, hospedado em uma máquina virtual na Azure.

---

## 📦 Arquitetura da Solução

- 🐍 **Backend:** Flask + PostgreSQL
- 🐘 **Banco de Dados:** PostgreSQL 17
- ☁️ **Hospedagem:** Máquina virtual Ubuntu 22.04 na Azure
- 🔐 **Autenticação:** Usuário e senha
- 🚀 **Orquestração:** Systemd

---

## 🚀 Criação da Máquina Virtual (VM)

### 🔧 Configurações da VM no Azure:

- **Assinatura:** Azure for Students
- **Grupo de recursos:** maquinas-virtuais
- **Nome da VM:** onco-vision
- **Região:** (US) East US 2
- **Opções de disponibilidade:** Zona de Disponibilidade
- **Zona:** Selecionada automaticamente pelo Azure
- **Tipo de segurança:** Padrão
- **Imagem:** Ubuntu Server 22.04 LTS - x64 Gen2
- **Arquitetura:** x64
- **Tamanho:** Standard_B1S (1 vCPU, 1GiB RAM) — *Serviço gratuito*
- **Tipo de autenticação:** Senha
- **Usuário:** webhost
- **Senha:** Fatec@Franca123
- **Portas liberadas:** 22 (SSH), 80 (HTTP), 443 (HTTPS), **5000 (API)**

---

## 🔗 Acesso SSH

```bash
ssh webhost@<IP_DA_VM>
senha: Fatec@Franca123
```

### 📦 Criação de usuário adicional

```bash
sudo adduser pi6
senha: <CRIE_SUA_SENHA>
sudo usermod -aG sudo pi6
sudo reboot now
```

Acessar novamente:

```bash
ssh pi6@<IP_DA_VM>
senha: <SENHA>
```

---

## 🕒 Configurar o timezone

```bash
sudo timedatectl set-timezone America/Sao_Paulo
date
```

---

## 🐘 Instalação do PostgreSQL 17

```bash
sudo apt update
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg
sudo apt update

sudo apt install postgresql-17
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Verificar versão:

```bash
psql --version
```

---

## 🎯 Configurar o banco de dados

```bash
sudo -u postgres psql
```

### 🔑 Alterar senha do usuário `postgres`:

```sql
ALTER USER postgres PASSWORD '<SENHA_USUARIO_POSTGRES>';
```

### 📦 Criar o banco de dados e tabelas:

```sql
CREATE DATABASE oncovision;
\c oncovision

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

\dt
\q
```

---

## 📤 Transferir o backend para a VM

No terminal local:

```bash
scp -r ./backend pi6@<IP_DA_VM>:/home/pi6/
```

---

## 🐍 Preparar ambiente Python

```bash
cd /home/pi6/backend

sudo apt install python3.12-venv -y
sudo apt install -y python3-dev libpq-dev build-essential

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

deactivate
```

---

## 🔥 Teste manual do backend

```bash
source venv/bin/activate
python3 app.py
```

---

## 🔧 Configurar como serviço (Systemd)

Criar o arquivo de serviço:

```bash
sudo nano /etc/systemd/system/oncovision.service
```

Conteúdo:

```ini
[Unit]
Description=OncoVision Backend
After=network-online.target
Wants=network-online.target

[Service]
User=pi6
WorkingDirectory=/home/pi6/backend
Environment="PATH=/home/pi6/backend/venv/bin"
ExecStart=/home/pi6/backend/venv/bin/python /home/pi6/backend/app.py
Restart=always
StandardOutput=append:/var/log/oncovision.log
StandardError=append:/var/log/oncovision_error.log

[Install]
WantedBy=multi-user.target
```

### Ativar e iniciar o serviço:

```bash
sudo systemctl daemon-reload
sudo systemctl start oncovision.service
sudo systemctl enable oncovision.service
sudo systemctl status oncovision.service
```

---

## 🔓 Liberar porta no firewall (UFW)

```bash
sudo ufw allow 5000/tcp
sudo ufw enable
sudo ufw status
```

---

## 🌐 Configuração de portas na Azure

- Libere a porta **5000 TCP** no grupo de segurança de rede (NSG) da máquina virtual.

---

## ✅ Verificar se está funcionando

```bash
curl http://<IP_DA_VM>:5000
```

No terminal local, testar API:

```bash
curl -X POST http://<IP_DA_VM>:5000/register -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}'

curl -X POST http://<IP_DA_VM>:5000/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}'
```

---

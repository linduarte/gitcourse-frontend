## 📘 **GitCourse Backend — Reference Guide (Versão Expandida)**

Manual definitivo de operação, deploy, monitoramento e diagnóstico

## **1. Estrutura do Servidor**

```plaintext
/var/www/gitcourse-backend/
    ├── .venv/                 # Virtual environment
    ├── main.py                # FastAPI entrypoint
    ├── app/                   # Application code
    ├── requirements.txt       # Python dependencies
    └── ...
```

## **2. Serviço systemd (Backend em Produção)**

**Arquivo:** `/etc/systemd/system/gitcourse-new.service`

```ini
[Unit]
Description=GitCourse FastAPI Backend (New)
After=network.target

[Service]
User=root
Group=root
WorkingDirectory=/var/www/gitcourse-backend
Environment="DATABASE_URL=postgresql+psycopg2://scotti:SENHA@localhost:5432/gitcourse"
ExecStart=/var/www/gitcourse-backend/.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

### **Comandos Importantes**

| Ação               | Comando                                   |
| ------------------ | ----------------------------------------- |
| Iniciar            | `systemctl start gitcourse-new.service`   |
| Parar              | `systemctl stop gitcourse-new.service`    |
| Reiniciar          | `systemctl restart gitcourse-new.service` |
| Status             | `systemctl status gitcourse-new.service`  |
| Habilitar no boot  | `systemctl enable gitcourse-new.service`  |
| Recarregar systemd | `systemctl daemon-reload`                 |

## **3. NGINX (Reverse Proxy)**

**Arquivo:** `/etc/nginx/sites-available/gitcourse`

```nginx
server {
    listen 80;
    server_name git-learn.com.br www.git-learn.com.br;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:8000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### **Comandos Importantes**

| Ação           | Comando                             |
| -------------- | ----------------------------------- |
| Testar config  | `nginx -t`                          |
| Reiniciar      | `systemctl restart nginx`           |
| Logs de erro   | `tail -f /var/log/nginx/error.log`  |
| Logs de acesso | `tail -f /var/log/nginx/access.log` |

## **4. Monitoramento do Backend (Health Check)**

### **Script:** `/usr/local/bin/gitcourse-healthcheck.sh`

Executado a cada 1 minuto via systemd timer.

Verifica:

- Disponibilidade do backend

- Tempo de resposta

- Reinício automático em caso de falha

- Alerta no Telegram

## **5. Monitoramento do PostgreSQL (Crítico)**

### **Script:** `/usr/local/bin/gitcourse-db-monitor.sh`

Verifica:

- Conexão com o banco

- Latência

- Número de conexões

- Espaço em disco

- Integridade básica (VACUUM test)

- Alertas no Telegram

### **Timer:** `/etc/systemd/system/gitcourse-db-monitor.timer`

Executa a cada 1 minuto.

## **6. Alertas no Telegram**

Todos os módulos usam:

- Bot Token

- Chat ID

- Função `send_alert()`

- Mensagens HTML formatadas

Alertas enviados para:

- Backend fora do ar

- Backend lento

- Banco fora do ar

- Banco lento

- Limite de conexões

- Disco crítico

- Falha de integridade

- Deploy concluído

## **7. Deploy Manual**

### **1. Entrar no diretório**

```gcode
cd /var/www/gitcourse-backend
```

2. ### Atualizar código

```gcode
git pull
```

3. ### Atualizar dependências

```gcode
. .venv/bin/activate
pip install -r requirements.txt
```

4. ### Reiniciar backend

```pcode
systemctl restart gitcourse-new.service
```

## **8. Deploy Automatizado (Webhook)**

NGINX expõe porta 9001 → backend recebe → executa:

1. `git pull`

2. `pip install -r requirements.txt`

3. `systemctl restart gitcourse-new.service`

4. Envia alerta de deploy

## **9. Logs**

### Backend

```gcode
journalctl -u gitcourse-new.service -f
```

### NGINX

```gcode
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Monitoramento

```code
journalctl -u gitcourse-db-monitor.service -f
journalctl -u gitcourse-healthcheck.service -f
```

## **10. Checklist de Emergência**

### **Backend caiu**

```gcode
systemctl status gitcourse-new.service
journalctl -u gitcourse-new.service -f
```

### **502 Bad Gateway**

- Backend offline

- Porta 8000 não responde

- NGINX não reiniciado

### **Banco fora do ar**

- Ver alertas do Telegram

- Ver `/usr/local/bin/gitcourse-db-monitor.sh`

- Testar manualmente:

```gcode
psql -U scotti -h localhost -d gitcourse -c "SELECT 1;"
```

### NGINX não responde

```gcode
nginx -t
systemctl restart nginx
```

## **11. Componentes Confirmados como Funcionando**

- Backend FastAPI operacional

- Serviço systemd estável

- NGINX roteando corretamente

- Domínio servindo backend

- Banco conectado

- Monitoramento ativo

- Alertas Telegram funcionando

- Deploy manual e automático

- Logs funcionando

# Deployment Guide - BrainLab Admin Panel

## 🚀 Автодеплой (CI/CD)

Каждый push в `main` автоматически деплоится на продакшен-сервер через
GitHub Actions (`.github/workflows/deploy.yml`). Воркфлоу заходит на
сервер по SSH и запускает `git pull` + пересборку. Секреты
`SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY` настроены в
Settings → Secrets and variables → Actions.

Ручной деплой (`deploy.sh`, шаги ниже) нужен только для первоначальной
настройки нового сервера.

## 🖥️ Развертывание на сервере

### Требования
- Linux сервер (Ubuntu 20.04+)
- Node.js 16+
- npm или yarn
- Nginx или Apache (optional)

### Шаг 1: Подготовка сервера

```bash
# Обновить систему
sudo apt update && sudo apt upgrade -y

# Установить Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверить версию
node --version
npm --version
```

### Шаг 2: Загрузить проект

```bash
# На сервере в нужной директории
cd /var/www/
git clone <your-repo-url> brainlab
cd brainlab
```

### Шаг 3: Настроить Backend

```bash
cd backend

# Установить зависимости
npm install --production

# Создать файл .env
cat > .env << EOF
PORT=3001
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
EOF

# Протестировать запуск
node server.js
```

### Шаг 4: Настроить Frontend

```bash
cd ../frontend

# Установить зависимости
npm install

# Собрать production версию
npm run build

# Содержимое dist/ будет использоваться для фронтенда
```

### Шаг 5: Настроить Nginx

```bash
# Создать конфиг для Nginx
sudo nano /etc/nginx/sites-available/brainlab

# Вставить конфиг:
```

```nginx
# Backend API
upstream backend {
    server localhost:3001;
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com;
    
    # Редирект на HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS Frontend
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    root /var/www/brainlab/frontend/dist;
    
    # Frontend статика
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API проксирование
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Включить конфиг
sudo ln -s /etc/nginx/sites-available/brainlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Шаг 6: Настроить SSL (Let's Encrypt)

```bash
# Установить certbot
sudo apt install certbot python3-certbot-nginx

# Получить сертификат
sudo certbot certonly --nginx -d yourdomain.com

# Автоматическое обновление
sudo systemctl enable certbot.timer
```

### Шаг 7: Запустить Backend как сервис

```bash
# Создать systemd юнит
sudo nano /etc/systemd/system/brainlab-backend.service

# Вставить:
```

```ini
[Unit]
Description=BrainLab Backend API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/brainlab/backend
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

Environment="NODE_ENV=production"
EnvironmentFile=/var/www/brainlab/backend/.env

[Install]
WantedBy=multi-user.target
```

```bash
# Запустить сервис
sudo systemctl daemon-reload
sudo systemctl enable brainlab-backend
sudo systemctl start brainlab-backend

# Проверить статус
sudo systemctl status brainlab-backend
```

### Шаг 8: Настроить резервное копирование

```bash
# Создать скрипт резервного копирования
nano /var/www/brainlab/backup.sh

#!/bin/bash
BACKUP_DIR="/backups/brainlab"
mkdir -p $BACKUP_DIR
tar -czf "$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).tar.gz" \
  /var/www/brainlab/backend/data/
# Хранить только последние 7 дней
find $BACKUP_DIR -mtime +7 -delete

# Добавить в crontab
crontab -e

# Добавить строку (ежедневно в 2 часа ночи):
0 2 * * * /var/www/brainlab/backup.sh
```

### Шаг 9: Мониторинг

```bash
# Установить PM2 для мониторинга
sudo npm install -g pm2

# Запустить backend с PM2
pm2 start /var/www/brainlab/backend/server.js --name "brainlab-api"

# Сохранить конфиг
pm2 save

# Настроить автозапуск
pm2 startup
```

## 🔐 Production Checklist

- [ ] Измените JWT_SECRET
- [ ] Включите HTTPS
- [ ] Настроили CORS (ограничить origins)
- [ ] Установили файл .env
- [ ] Протестировали все функции
- [ ] Настроили резервное копирование
- [ ] Настроили мониторинг логов
- [ ] Ограничили доступ к папке backend/data
- [ ] Настроили rate limiting (если нужно)

## 📊 Мониторинг логов

```bash
# Логи Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Логи Backend (если systemd)
sudo journalctl -u brainlab-backend -f

# Логи Backend (если PM2)
pm2 logs brainlab-api
```

## 🔄 Обновление приложения

```bash
cd /var/www/brainlab

# Получить последнюю версию
git pull

# Обновить backend
cd backend
npm install --production
systemctl restart brainlab-backend

# Обновить frontend
cd ../frontend
npm install
npm run build
# Nginx автоматически подхватит новые файлы
```

## 🚨 Troubleshooting

### Backend не запускается
```bash
systemctl status brainlab-backend
journalctl -u brainlab-backend -n 50
```

### Данные не сохраняются
```bash
# Проверить права
ls -la /var/www/brainlab/backend/data/
# Исправить права
sudo chown -R www-data:www-data /var/www/brainlab/backend/data
```

### Nginx не перенаправляет на backend
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 📞 Support

По вопросам обращайтесь к администратору сервера.

---

**Последнее обновление:** Июнь 2026

#!/bin/bash
set -e

REPO_URL="https://github.com/mrkiro52/brainlab.git"

echo "=== BrainLab: автоматический деплой ==="

echo "--- Обновление системы ---"
apt update -y && apt upgrade -y

echo "--- Установка Node.js 18, Git, Nginx ---"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt-get install -y nodejs
fi
apt install -y git nginx
node --version

echo "--- Клонирование / обновление репозитория ---"
if [ -d /var/www/brainlab/.git ]; then
  cd /var/www/brainlab
  git fetch origin main
  git reset --hard origin/main
else
  rm -rf /var/www/brainlab
  git clone "$REPO_URL" /var/www/brainlab
  cd /var/www/brainlab
fi

echo "--- Подготовка папки данных (не трекается git, живой контент) ---"
mkdir -p /var/www/brainlab/backend/data

echo "--- Создание непривилегированного пользователя для backend ---"
if ! id -u brainlab >/dev/null 2>&1; then
  useradd --system --no-create-home --shell /usr/sbin/nologin brainlab
fi

echo "--- Установка Backend ---"
cd /var/www/brainlab/backend
npm install --production

if [ ! -f .env ]; then
  JWT_SECRET=$(openssl rand -base64 32)
  cat > .env << EOF
PORT=3001
JWT_SECRET=${JWT_SECRET}
NODE_ENV=production
EOF
fi

# Только backend/data должен быть доступен на запись процессу приложения —
# сам код деплоится/обновляется root'ом через git.
chown -R brainlab:brainlab /var/www/brainlab/backend/data

echo "--- Сборка Frontend ---"
cd /var/www/brainlab/frontend
npm install
npm run build

echo "--- Настройка Nginx (доступ по IP) ---"
cat > /etc/nginx/sites-available/brainlab << 'EOF'
upstream backend {
    server localhost:3001;
}

# Публичный сайт (статичные HTML-страницы) — порт 80
server {
    listen 80 default_server;
    server_name _;

    root /var/www/brainlab;
    index index.html;

    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ =404;
    }
}

# Админ-панель (React SPA) — порт 8080
server {
    listen 8080;
    server_name _;

    root /var/www/brainlab/frontend/dist;
    index index.html;

    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/brainlab /etc/nginx/sites-enabled/brainlab
nginx -t
systemctl restart nginx
systemctl enable nginx

echo "--- Настройка автозапуска Backend (systemd) ---"
cat > /etc/systemd/system/brainlab-backend.service << 'EOF'
[Unit]
Description=BrainLab Backend API
After=network.target

[Service]
Type=simple
User=brainlab
Group=brainlab
WorkingDirectory=/var/www/brainlab/backend
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
EnvironmentFile=/var/www/brainlab/backend/.env

# Sandboxing: the process only needs to read its own code and write to backend/data.
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/www/brainlab/backend/data

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable brainlab-backend
systemctl restart brainlab-backend

echo "--- Открытие портов файрвола (если ufw активен) ---"
if command -v ufw >/dev/null 2>&1; then
  ufw allow 80/tcp || true
  ufw allow 8080/tcp || true
  ufw allow 22/tcp || true
fi

echo "--- Настройка SSH-доступа для GitHub Actions ---"
mkdir -p /root/.ssh
chmod 700 /root/.ssh
touch /root/.ssh/authorized_keys
DEPLOY_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGUQLK4IqyzTFf2EFjb0hJROwPgsWgX21LVXE+WctIWi github-actions-deploy"
grep -qF "$DEPLOY_KEY" /root/.ssh/authorized_keys || echo "$DEPLOY_KEY" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

sleep 2
echo ""
echo "=== ГОТОВО ==="
systemctl status brainlab-backend --no-pager | head -5
echo ""
SERVER_IP=$(curl -s ifconfig.me || hostname -I | awk '{print $1}')
echo "Сайт:        http://${SERVER_IP}/"
echo "Админ-панель: http://${SERVER_IP}:8080/admin"
echo "Пароль админки: admin52"

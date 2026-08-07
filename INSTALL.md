# Инструкция по установке - BrainLab Admin Panel

## 📋 Требования

- Node.js 14+ ([скачать](https://nodejs.org/))
- npm 6+ (идет в комплекте с Node.js)
- Git (для клонирования репозитория)

## 🔧 Установка зависимостей

### Способ 1: Автоматическая установка (рекомендуется)

Если у вас есть интернет соединение:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Способ 2: Ручная установка (если есть проблемы с интернетом)

#### Backend
```bash
cd backend
npm install express bcryptjs jsonwebtoken cors dotenv
```

#### Frontend
```bash
cd frontend
npm install react react-dom react-router-dom axios
npm install --save-dev @vitejs/plugin-react vite
```

### Способ 3: Использование yarn

Если npm не работает, попробуйте yarn:

```bash
# Установить yarn
npm install -g yarn

# Backend
cd backend
yarn install

# Frontend  
cd ../frontend
yarn install
```

### Способ 4: Оффлайн установка

Если нет интернета:

1. На компьютере с интернетом выполните:
```bash
npm install --no-save express bcryptjs jsonwebtoken cors dotenv
# Скопируйте node_modules на USB флешку
```

2. На целевом компьютере:
```bash
# Скопируйте node_modules из package.json в папку проекта
cp -r /path/to/usb/node_modules ./backend/
cp -r /path/to/usb/node_modules ./frontend/
```

## ✅ Проверка установки

```bash
# Проверить версии
node --version
npm --version

# Backend - должны существовать папки
ls -la backend/node_modules | head

# Frontend - должны существовать папки
ls -la frontend/node_modules | head
```

## 🚀 Первый запуск

### Terminal 1 - Backend

```bash
cd backend
npm start
```

Вы должны увидеть:
```
Server running on port 3001
```

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Вы должны увидеть:
```
VITE v4.4.0  ready in 123 ms

➜  Local:   http://localhost:3000/
```

### Terminal 3 - Откройте браузер

Перейдите на `http://localhost:3000` и создайте admin аккаунт.

## 🔍 Решение проблем при установке

### ❌ "npm: command not found"

Node.js не установлен. Установите с [nodejs.org](https://nodejs.org/)

### ❌ "npm ERR! code ENOTFOUND"

Проблема с интернетом:
```bash
# Проверить соединение
ping registry.npmjs.org

# Изменить npm registry
npm config set registry https://registry.npm.taobao.org

# Или вернуть оригинальный
npm config set registry https://registry.npmjs.org/
```

### ❌ "npm ERR! code EACCES"

Проблема с правами доступа:
```bash
# Linux/Mac
sudo chown -R $(whoami) ~/.npm

# Windows (запустить как администратор)
npm install -g npm
```

### ❌ Порты заняты (3000 или 3001)

```bash
# Проверить какой процесс использует порт
# Linux/Mac
lsof -i :3001
lsof -i :3000

# Windows
netstat -ano | findstr :3001

# Убить процесс (Linux/Mac)
kill -9 <PID>

# Или измените PORT в backend/.env
PORT=3002
```

### ❌ "Module not found"

Переустановите зависимости:
```bash
# Удалить cache
npm cache clean --force

# Переустановить
rm -rf node_modules package-lock.json
npm install
```

## 📦 Что установится

### Backend зависимости:
- **express** - веб фреймворк
- **bcryptjs** - хеширование паролей
- **jsonwebtoken** - JWT токены
- **cors** - обработка CORS
- **dotenv** - переменные окружения

### Frontend зависимости:
- **react** - библиотека UI
- **react-dom** - рендеринг в DOM
- **react-router-dom** - маршрутизация
- **axios** - HTTP клиент
- **vite** - сборщик проекта
- **@vitejs/plugin-react** - поддержка React в Vite

## 🎯 Проверка корректности установки

Запустите оба сервера и проверьте:

1. ✅ Backend запустился на порте 3001
2. ✅ Frontend доступен на http://localhost:3000
3. ✅ Можно создать admin аккаунт
4. ✅ Можно войти в admin панель
5. ✅ Можно добавить новый item в любой раздел
6. ✅ Item сохранился в базу данных
7. ✅ Можно отредактировать item
8. ✅ Можно удалить item

Если все работает - поздравляем! Установка успешна! 🎉

## 📞 Дополнительная помощь

Если у вас остались вопросы:
1. Проверьте SETUP.md
2. Проверьте логи в консоли
3. Проверьте файл .env в backend папке
4. Убедитесь что оба сервера запущены

---

**Версия:** 1.0.0  
**Последнее обновление:** Июнь 2026

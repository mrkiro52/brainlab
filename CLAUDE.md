# Claude Code Guide - BrainLab Admin Panel

## 📋 Проект Overview

**BrainLab Admin Panel** - полнофункциональная система управления контентом научной лаборатории.

### Технологический стек
- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Database:** JSON files
- **Auth:** JWT + Bcrypt

### Структура проекта

```
brainlab/
├── backend/                    # REST API (Node.js/Express)
│   ├── server.js              # Entry point сервера
│   ├── middleware/auth.js     # JWT & Bcrypt логика
│   ├── routes/                # API маршруты (6 файлов)
│   ├── controllers/           # Бизнес-логика (6 файлов)
│   ├── utils/db.js            # JSON DB wrapper
│   ├── data/                  # JSON файлы базы
│   └── package.json
│
├── frontend/                  # Admin Panel (React + Vite)
│   ├── src/
│   │   ├── App.jsx            # Root приложение
│   │   ├── admin/AdminPanel.jsx
│   │   ├── admin/sections/    # 6 менеджеров (Research, Pub, Course, Team, Project, Blog)
│   │   ├── admin/forms/       # 6 форм для каждого типа
│   │   ├── pages/Login.jsx    # Auth страница
│   │   └── styles/            # CSS модули
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── README_ADMIN.md            # Quick start guide
├── SETUP.md                   # Полная инструкция setup
├── INSTALL.md                 # Инструкция установки зависимостей
├── DEPLOYMENT.md              # Deployment на продакшен
├── API_EXAMPLES.md            # Примеры API вызовов
└── CLAUDE.md                  # Этот файл
```

## 🎯 Основные функции

✅ **CRUD операции** для 6 типов контента:
  1. Research (исследования)
  2. Publications (публикации)
  3. Courses (курсы)
  4. Team (команда - с фото из URL)
  5. Projects (проекты)
  6. Blog (блог)

✅ **Security:**
  - JWT токены для аутентификации
  - Bcrypt хеширование паролей
  - Защита всех PUT/DELETE запросов

✅ **Database:**
  - JSON файлы в `backend/data/`
  - Автоматически создаются при старте
  - Переносятся с приложением на продакшен

## 🚀 Quick Start

```bash
# Terminal 1 - Backend
cd backend
npm install  # если не установлены
npm start    # http://localhost:3001

# Terminal 2 - Frontend
cd frontend
npm install  # если не установлены
npm run dev  # http://localhost:3000
```

Первый запуск: создайте admin аккаунт через UI на `/login`

## 🔧 Development Guidelines

### Backend разработка

**Структура контроллера** (смотрите `backend/controllers/researchController.js`):
```javascript
// Паттерн для CRUD операций
getAll(req, res)      // GET /api/{type}
getById(req, res)     // GET /api/{type}/:id
create(req, res)      // POST /api/{type}
update(req, res)      // PUT /api/{type}/:id
remove(req, res)      // DELETE /api/{type}/:id
```

**Добавление нового типа контента:**
1. Создать `backend/controllers/{newType}Controller.js`
2. Создать `backend/routes/{newType}.js`
3. Импортировать в `backend/server.js`

**Database функции** (`backend/utils/db.js`):
```javascript
read(filename)              // Прочитать JSON
write(filename, data)       // Записать JSON
getById(filename, id)       // Получить по ID
create(filename, item)      // Создать с авто-ID
update(filename, id, data)  // Обновить
remove(filename, id)        // Удалить
```

### Frontend разработка

**Структура менеджера** (смотрите `frontend/src/admin/sections/ResearchManager.jsx`):
```javascript
// Компонент управления типом контента
// Props: token (JWT), автоматический fetch & CRUD
// Hooks: useState для show/edit state, useEffect для fetch
```

**Структура формы** (смотрите `frontend/src/admin/forms/ResearchForm.jsx`):
```javascript
// Управляемая форма с initialData для редактирования
// onChange -> setFormData -> onSave(formData)
// onCancel -> закрыть форму
```

**Паттерн для добавления нового раздела:**
1. Создать `admin/sections/{NewType}Manager.jsx` (скопировать от Research)
2. Создать `admin/forms/{NewType}Form.jsx` (адаптировать поля)
3. Импортировать в `admin/AdminPanel.jsx`
4. Добавить nav link в sidebar

### Безопасность

**Token использование:**
```javascript
// Frontend
const response = await axios.post(url, data, {
  headers: { Authorization: `Bearer ${token}` }
});

// Backend
const { verifyToken } = require('../middleware/auth');
router.post('/', verifyToken, create);  // Требует токена
```

**Пароль хеширование:**
```javascript
// Backend auth.js
const passwordHash = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, admin.passwordHash);
```

## 📦 Зависимости

### Backend
- **express** - веб фреймворк
- **bcryptjs** - хеш паролей
- **jsonwebtoken** - JWT токены
- **cors** - CORS обработка
- **dotenv** - env переменные

### Frontend
- **react** - UI библиотека
- **react-router-dom** - маршрутизация
- **axios** - HTTP клиент
- **vite** - сборщик (dev server)

## 🔍 Файлы для редактирования

Если нужно добавить функциональность:

| Задача | Файлы |
|--------|-------|
| Новый тип контента | controller, route, manager, form |
| Изменить поля формы | соответствующая form.jsx |
| Добавить валидацию | controller.js (create/update) |
| Изменить UI админки | AdminPanel.css |
| Новые поля в БД | увеличить поля в форме + контроллер |

## 🐛 Debugging

**Backend логи:**
```bash
# Включить детальные логи
NODE_DEBUG=* npm start

# Проверить API
curl http://localhost:3001/api/health
```

**Frontend логи:**
```javascript
// React DevTools браузера
// Console вкладка для axios ошибок
console.log(response) // проверить данные
```

**Database проверка:**
```bash
# Посмотреть содержимое
cat backend/data/research.json

# Очистить данные (если нужно)
echo "[]" > backend/data/research.json
```

## 🚨 Common Issues

| Проблема | Решение |
|----------|--------|
| "Module not found" | `npm install` в соответствующей папке |
| CORS ошибки | Проверить Backend запущен на 3001 |
| Токен не работает | Проверить JWT_SECRET в .env |
| Данные не сохраняются | Проверить права на `backend/data/` |
| Port занят | Изменить PORT в backend/.env |

## 📚 Документация

- `README_ADMIN.md` - для конечных пользователей
- `SETUP.md` - полная инструкция по запуску
- `INSTALL.md` - установка зависимостей
- `API_EXAMPLES.md` - примеры API
- `DEPLOYMENT.md` - развертывание на продакшен

## 🔐 Production Checklist

Перед deploy:
- [ ] Изменен JWT_SECRET в backend/.env
- [ ] Включен HTTPS в production
- [ ] CORS ограничен для конкретных origin
- [ ] Резервное копирование настроено
- [ ] Rate limiting добавлено
- [ ] Логирование настроено
- [ ] Протестирована вся функциональность

## 📞 Architecture Notes

**Data Flow:**
```
Frontend → (axios) → Backend → (db.js) → JSON files
         ← (JSON) ←         ← (return) ←
```

**Authentication Flow:**
```
Login Form → verify password → generate JWT token → store in localStorage
Subsequent requests → add token to Authorization header → verifyToken middleware
```

**Database Synchronization:**
```
Каждый CRUD запрос читает/пишет JSON файл на диск
Нет в-памяти кеша → всегда актуальные данные
Проблема: медленнее чем БД, но достаточно для малых проектов
```

## ✅ Testing Guidelines

Перед commit проверить:
1. Backend запускается без ошибок
2. Frontend приложение загружается
3. Можно создать admin аккаунт
4. Можно залогиниться
5. Все операции CRUD работают
6. Данные сохраняются после перезагрузки страницы
7. Токен корректно валидируется

## 🎓 Learning Resources

Если нужно понять как работает:
- **JWT:** https://jwt.io/
- **Bcrypt:** https://www.npmjs.com/package/bcryptjs
- **Express:** https://expressjs.com/
- **React:** https://react.dev/
- **Vite:** https://vitejs.dev/

## 🚀 Future Improvements

Идеи для расширения:
- [ ] Импорт/экспорт данных (CSV, JSON)
- [ ] Поиск и фильтрация в админке
- [ ] Пагинация для больших списков
- [ ] User roles и permissions
- [ ] Image upload (вместо URL)
- [ ] Database миграции
- [ ] Audit логирование
- [ ] WebSocket для real-time updates
- [ ] Dark mode для админки
- [ ] Backup/restore функции

---

**Версия:** 1.0.0  
**Последнее обновление:** Июнь 2026  
**Maintainer:** [Ваше имя]

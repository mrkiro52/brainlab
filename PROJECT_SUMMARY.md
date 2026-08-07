# BrainLab Admin Panel - Project Summary

## 🎯 Project Overview

**BrainLab Admin Panel** - полнофункциональная система управления контентом научной лаборатории. Позволяет администраторам управлять исследованиями, публикациями, курсами, командой, проектами и статьями блога через интуитивный веб-интерфейс.

## ✨ Key Features

✅ **6 типов контента с CRUD операциями:**
- Research (Исследования)
- Publications (Публикации)
- Courses (Курсы)
- Team (Команда - с фото из URL)
- Projects (Проекты)
- Blog (Блог)

✅ **Безопасность:**
- JWT токены для аутентификации
- Bcrypt хеширование паролей
- Защита всех операций редактирования

✅ **Простота развертывания:**
- JSON файлы как база данных
- Вся БД переносится с приложением
- Не требует отдельного DB сервера

## 📊 Technology Stack

| Компонент | Технология | Версия |
|-----------|-----------|--------|
| Backend API | Node.js + Express | 14+ |
| Frontend UI | React + Vite | 18+ |
| Authentication | JWT + Bcryptjs | - |
| Database | JSON файлы | - |
| Package Manager | npm/yarn | 6+ |

## 📁 Project Structure

```
brainlab/
├── backend/
│   ├── controllers/          # Бизнес-логика (6 файлов)
│   ├── routes/              # API маршруты (6 файлов)
│   ├── middleware/auth.js   # JWT & Bcrypt
│   ├── utils/db.js          # JSON DB обертка
│   ├── data/                # JSON базы данных
│   ├── server.js            # Express приложение
│   ├── .env                 # Переменные окружения
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── AdminPanel.jsx      # Главная админ панель
│   │   │   ├── sections/           # 6 менеджеров контента
│   │   │   └── forms/              # 6 форм редактирования
│   │   ├── pages/
│   │   │   └── Login.jsx           # Страница входа
│   │   ├── styles/                 # CSS файлы
│   │   ├── App.jsx                 # Root компонент
│   │   └── index.jsx               # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── docs/
│   ├── README_ADMIN.md       # Быстрый старт
│   ├── SETUP.md              # Полная инструкция
│   ├── INSTALL.md            # Установка зависимостей
│   ├── API_EXAMPLES.md       # Примеры API
│   ├── DEPLOYMENT.md         # Продакшн развертывание
│   └── CLAUDE.md             # Для разработчиков
│
└── scripts/
    ├── start.sh              # Linux/Mac запуск
    └── start.bat             # Windows запуск
```

## 🚀 Quick Start

### На Linux/Mac:
```bash
bash start.sh
```

### На Windows:
```bash
start.bat
```

### Или вручную:
```bash
# Terminal 1 - Backend
cd backend && npm install && npm start

# Terminal 2 - Frontend  
cd frontend && npm install && npm run dev
```

Откройте `http://localhost:3000` в браузере.

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/setup` - Создание admin (первый раз)
- `POST /api/auth/login` - Вход admin

### Data Management (для каждого типа: research, publications, courses, team, projects, blog)
```
GET    /api/{type}        - Получить все элементы
GET    /api/{type}/:id    - Получить один элемент
POST   /api/{type}        - Создать (требует JWT)
PUT    /api/{type}/:id    - Обновить (требует JWT)
DELETE /api/{type}/:id    - Удалить (требует JWT)
```

## 💾 Database Structure

Каждый тип контента хранится в отдельном JSON файле в `backend/data/`:

**research.json / publications.json / courses.json / team.json / projects.json / blog.json**

Пример структуры:
```json
[
  {
    "id": "1685702000000",
    "title": "Example Item",
    "description": "Item description",
    "otherFields": "..."
  }
]
```

## 🔐 Security Features

1. **Password Hashing** - Bcryptjs с 10-round salt
2. **JWT Tokens** - 24 часовой expiration
3. **Protected Routes** - verifyToken middleware на всех POST/PUT/DELETE
4. **CORS** - Настраивается в production
5. **Environment Variables** - Чувствительные данные в .env

## 📈 Performance

- ⚡ **Быстрая загрузка** - React + Vite
- 📦 **Минимальные зависимости** - Только необходимые пакеты
- 🔄 **JSON файлы** - Достаточно для небольших объемов

Рекомендуется для:
- До 10,000 элементов в каждом типе
- 1-10 администраторов одновременно
- Лабораторных/исследовательских проектов

Для больших объемов рекомендуется миграция на PostgreSQL/MongoDB.

## 🛠️ Development

### Добавить новый тип контента

1. **Создать controller** - `backend/controllers/newTypeController.js`
2. **Создать routes** - `backend/routes/newType.js`
3. **Создать manager** - `frontend/src/admin/sections/NewTypeManager.jsx`
4. **Создать form** - `frontend/src/admin/forms/NewTypeForm.jsx`
5. **Обновить AdminPanel.jsx** - добавить route и nav link

### Модифицировать поля

1. Обновить форму в `admin/forms/`
2. Обновить контроллер для валидации
3. JSON автоматически сохранит новые поля

## 📚 Documentation Files

| Файл | Назначение |
|------|-----------|
| `README_ADMIN.md` | Быстрый старт для пользователей |
| `SETUP.md` | Полная инструкция по setup |
| `INSTALL.md` | Помощь с установкой зависимостей |
| `DEPLOYMENT.md` | Развертывание на сервер (Nginx, SSL, etc.) |
| `API_EXAMPLES.md` | Примеры curl, Node.js, Python, React |
| `CLAUDE.md` | Руководство для разработчиков |

## 🚨 Important Notes

### Перед production:
1. ✅ Измените `JWT_SECRET` в backend/.env
2. ✅ Включите HTTPS
3. ✅ Ограничьте CORS origins
4. ✅ Настройте резервное копирование JSON файлов
5. ✅ Протестируйте все функции

### File-based Database:
- ✅ Простая и надежная для малых проектов
- ✅ Нет необходимости в отдельном DB сервере
- ❌ Медленнее чем SQL/NoSQL для больших объемов
- ❌ Не поддерживает параллельные записи (нужен лок механизм)

## 📈 Scaling Options

Если приложение растет:

1. **Фаза 1** (текущее) - JSON файлы ✅
2. **Фаза 2** - SQLite для локального deployment
3. **Фаза 3** - PostgreSQL + Redis кеш
4. **Фаза 4** - Микросервисы архитектура

Миграция между фазами требует изменения только `db.js` и контроллеров.

## 🤝 Contributing

При разработке:
1. Следите за паттернами в существующем коде
2. Используйте CLAUDE.md как руководство
3. Тестируйте backend вызовы с curl перед frontend
4. Проверьте все CRUD операции перед commit
5. Обновите документацию при добавлении features

## 🐛 Known Limitations

- JSON файловая БД не поддерживает параллельные операции
- Максимальный размер файла базы ~ 100MB
- Нет встроенного поиска (только фильтрация на frontend)
- Нет аудит логирования

## 📞 Support & Contact

По вопросам обратитесь к разработчику или посмотрите:
- CLAUDE.md - для технических деталей
- API_EXAMPLES.md - для примеров
- DEPLOYMENT.md - для развертывания

## 📜 License

[Укажите лицензию если нужно]

## 📝 Changelog

**v1.0.0** (Июнь 2026)
- ✅ Инициальный релиз
- ✅ 6 типов контента
- ✅ JWT аутентификация
- ✅ Полная админ панель
- ✅ JSON база данных

---

**Версия:** 1.0.0  
**Последнее обновление:** Июнь 2026  
**Статус:** Production Ready ✅

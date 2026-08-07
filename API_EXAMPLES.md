# API Examples - BrainLab Admin Panel

## 🔐 Authentication

### Setup Admin (первый раз)
```bash
curl -X POST http://localhost:3001/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "secure-password"
  }'
```

Response:
```json
{
  "message": "Admin created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "admin_1685702000000",
    "username": "admin"
  }
}
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "password": "secure-password"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "admin_1685702000000",
    "username": "admin"
  }
}
```

## 📚 Research API

### Get All Research
```bash
curl http://localhost:3001/api/research
```

Response:
```json
[
  {
    "id": "1685702000000",
    "title": "Neural Networks",
    "description": "Deep learning research...",
    "image": "https://example.com/image.jpg"
  }
]
```

### Create Research
```bash
curl -X POST http://localhost:3001/api/research \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Neural Networks",
    "description": "Deep learning research on neural networks...",
    "image": "https://example.com/image.jpg"
  }'
```

### Update Research
```bash
curl -X PUT http://localhost:3001/api/research/1685702000000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description..."
  }'
```

### Delete Research
```bash
curl -X DELETE http://localhost:3001/api/research/1685702000000 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📰 Publications API

### Create Publication
```bash
curl -X POST http://localhost:3001/api/publications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Deep Learning Survey",
    "authors": ["John Doe", "Jane Smith"],
    "description": "A comprehensive survey...",
    "image": "https://example.com/image.jpg",
    "category": "Journal",
    "date": "2024-06-02"
  }'
```

## 🎓 Courses API

### Create Course
```bash
curl -X POST http://localhost:3001/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Introduction to ML",
    "level": "Beginner",
    "duration": "4 weeks",
    "description": "Learn machine learning basics..."
  }'
```

## 👥 Team API

### Create Team Member
```bash
curl -X POST http://localhost:3001/api/team \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Dr. John Doe",
    "position": "Research Director",
    "photoUrl": "https://example.com/photo.jpg",
    "email": "john@example.com",
    "description": "PhD in Computer Science..."
  }'
```

**Важно:** `photoUrl` - это URL на изображение, не файл. Используйте внешние ссылки (imgur, cloudinary и т.д.)

### Get All Team Members
```bash
curl http://localhost:3001/api/team
```

## 🚀 Projects API

### Create Project
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Neural Architecture Search",
    "status": "Active",
    "startYear": 2024,
    "endYear": 2026,
    "description": "Research on automated architecture design...",
    "image": "https://example.com/image.jpg",
    "team": ["Dr. John Doe", "Jane Smith"],
    "resources": [
      "https://github.com/...",
      "https://paper.pdf"
    ]
  }'
```

## 📝 Blog API

### Create Blog Post
```bash
curl -X POST http://localhost:3001/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Latest Research Findings",
    "content": "Full post content here...",
    "excerpt": "Brief summary of the post...",
    "category": "Research",
    "image": "https://example.com/image.jpg",
    "author": "Dr. Smith"
  }'
```

## 🛠️ Node.js Client Example

```javascript
const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';
let token = null;

async function login(password) {
  const response = await axios.post(`${API_BASE}/auth/login`, { password });
  token = response.data.token;
  return token;
}

async function createResearch(data) {
  const response = await axios.post(`${API_BASE}/research`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

async function getAllResearch() {
  const response = await axios.get(`${API_BASE}/research`);
  return response.data;
}

// Usage
async function main() {
  await login('your-password');
  
  const research = await createResearch({
    title: 'My Research',
    description: 'Description...',
    image: 'https://...'
  });
  
  console.log('Created:', research);
}

main();
```

## 🐍 Python Client Example

```python
import requests
import json

API_BASE = 'http://localhost:3001/api'
token = None

def login(password):
    global token
    response = requests.post(f'{API_BASE}/auth/login', json={'password': password})
    token = response.json()['token']
    return token

def create_research(title, description, image=None):
    headers = {'Authorization': f'Bearer {token}'}
    data = {'title': title, 'description': description}
    if image:
        data['image'] = image
    
    response = requests.post(f'{API_BASE}/research', json=data, headers=headers)
    return response.json()

def get_all_research():
    response = requests.get(f'{API_BASE}/research')
    return response.json()

# Usage
if __name__ == '__main__':
    login('your-password')
    
    research = create_research(
        'My Research',
        'Description...',
        'https://...'
    )
    
    print('Created:', json.dumps(research, indent=2))
```

## 📱 React Hook Example

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useResearch(token) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = 'http://localhost:3001/api';

  const fetchAll = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/research`);
      setItems(response.data);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    const response = await axios.post(`${API_URL}/research`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems([...items, response.data]);
    return response.data;
  };

  const update = async (id, data) => {
    const response = await axios.put(`${API_URL}/research/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems(items.map(item => item.id === id ? response.data : item));
    return response.data;
  };

  const remove = async (id) => {
    await axios.delete(`${API_URL}/research/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems(items.filter(item => item.id !== id));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { items, loading, create, update, remove, refetch: fetchAll };
}
```

## ✅ Error Handling

Все ошибки возвращаются с status code 4xx или 5xx:

```json
{
  "error": "Invalid password"
}
```

Типичные коды ошибок:
- **400** - Bad Request (неверные данные)
- **401** - Unauthorized (требуется авторизация)
- **404** - Not Found (элемент не найден)
- **500** - Server Error (ошибка сервера)

---

**Версия API:** 1.0.0  
**Последнее обновление:** Июнь 2026

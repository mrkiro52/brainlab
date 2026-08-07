# BrainLab Admin Panel - Setup Guide

## Project Structure

```
brainlab/
├── backend/          # Node.js + Express API
├── frontend/         # React Admin Panel
└── (original files)  # HTML/CSS/JS static files
```

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Edit `.env` file in backend folder:
```
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### 3. Start Backend Server
```bash
npm start
```
Server will run on `http://localhost:3001`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Application will be available at `http://localhost:3000`

## First Time Setup

1. Open admin panel: `http://localhost:3000`
2. Click "Setup admin" 
3. Create admin account with username and password
4. Login with created credentials

## API Endpoints

### Authentication
- `POST /api/auth/setup` - Create admin (first time only)
- `POST /api/auth/login` - Admin login

### Data Management
- `GET /api/research` - Get all research items
- `POST /api/research` - Create new research (requires auth)
- `PUT /api/research/:id` - Update research (requires auth)
- `DELETE /api/research/:id` - Delete research (requires auth)

Same pattern for:
- `/api/publications`
- `/api/courses`
- `/api/team`
- `/api/projects`
- `/api/blog`

## Database

Database is stored as JSON files in `backend/data/`:
- `research.json`
- `publications.json`
- `courses.json`
- `team.json`
- `projects.json`
- `blog.json`
- `admin.json`

## Security Notes

1. **Change JWT Secret** - Update JWT_SECRET in backend/.env
2. **Strong Password** - Use secure admin password
3. **HTTPS** - Use HTTPS in production
4. **CORS** - Currently allows all origins, restrict in production

## Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Environment Setup
- Set NODE_ENV=production
- Update JWT_SECRET
- Set proper CORS origins
- Use environment variables for sensitive data

### Running in Production
```bash
cd backend
NODE_ENV=production npm start
```

Serve frontend from `dist/` folder using nginx or similar.

## Troubleshooting

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: The dev server will use next available port

### CORS Issues
Update CORS settings in backend/server.js:
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

### Database Not Found
The backend automatically creates data files on first run.

## Features

✅ Admin authentication with JWT
✅ CRUD operations for 6 content types
✅ File-based JSON database
✅ Responsive admin interface
✅ Simple and secure

## Support

For issues, check:
1. Both servers are running
2. Port numbers are correct
3. Environment variables are set
4. Network connectivity to localhost

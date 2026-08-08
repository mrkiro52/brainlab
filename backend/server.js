const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Behind Nginx: trust the first proxy hop so req.ip / rate limiting see the
// real client IP from X-Forwarded-For instead of treating every request as
// coming from localhost.
app.set('trust proxy', 1);

// Content is served cross-origin (site on :80, admin SPA on :8080) and auth uses a
// bearer token rather than cookies, so a wide-open CORS policy doesn't expose CSRF —
// an attacker page can't read/attach the victim's Authorization header cross-origin.
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // API-only server; no HTML is rendered here
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(express.json({ limit: '1mb' }));

// Routes
const authRoutes = require('./routes/auth');
const researchRoutes = require('./routes/research');
const publicationRoutes = require('./routes/publications');
const courseRoutes = require('./routes/courses');
const teamRoutes = require('./routes/team');
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blog');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Initialize data files if they don't exist
const initializeDataFiles = () => {
  const dataDir = path.join(__dirname, 'data');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const files = {
    'research.json': [],
    'publications.json': [],
    'courses.json': [],
    'team.json': [],
    'projects.json': [],
    'blog.json': [],
    'admin.json': []
  };

  Object.keys(files).forEach(filename => {
    const filepath = path.join(dataDir, filename);
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, JSON.stringify(files[filename], null, 2));
    }
  });
};

initializeDataFiles();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

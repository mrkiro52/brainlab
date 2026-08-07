const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

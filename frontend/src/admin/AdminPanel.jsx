import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ResearchManager from './sections/ResearchManager';
import PublicationManager from './sections/PublicationManager';
import CourseManager from './sections/CourseManager';
import TeamManager from './sections/TeamManager';
import ProjectManager from './sections/ProjectManager';
import BlogManager from './sections/BlogManager';
import '../styles/AdminPanel.css';

function AdminPanel({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('research');

  return (
    <div className="admin-panel">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <span className="admin-topbar-logo">B</span>
          <span className="admin-topbar-title">BrainLab Admin</span>
        </div>
        <div className="admin-topbar-right">
          <button className="logout-btn" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>

      <div className="admin-body">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <Link
              to="/admin/research"
              className={`nav-link ${activeTab === 'research' ? 'active' : ''}`}
              onClick={() => setActiveTab('research')}
            >
              Research
            </Link>
            <Link
              to="/admin/publications"
              className={`nav-link ${activeTab === 'publications' ? 'active' : ''}`}
              onClick={() => setActiveTab('publications')}
            >
              Publications
            </Link>
            <Link
              to="/admin/courses"
              className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </Link>
            <Link
              to="/admin/team"
              className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              Team
            </Link>
            <Link
              to="/admin/projects"
              className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </Link>
            <Link
              to="/admin/blog"
              className={`nav-link ${activeTab === 'blog' ? 'active' : ''}`}
              onClick={() => setActiveTab('blog')}
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="admin-content">
          <Routes>
            <Route path="/research" element={<ResearchManager token={token} />} />
            <Route path="/publications" element={<PublicationManager token={token} />} />
            <Route path="/courses" element={<CourseManager token={token} />} />
            <Route path="/team" element={<TeamManager token={token} />} />
            <Route path="/projects" element={<ProjectManager token={token} />} />
            <Route path="/blog" element={<BlogManager token={token} />} />
            <Route path="/" element={<ResearchManager token={token} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

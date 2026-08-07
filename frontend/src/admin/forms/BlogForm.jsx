import React, { useState, useEffect } from 'react';
import '../../styles/Form.css';

function BlogForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    image: '',
    author: 'Admin'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title *</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Excerpt *</label>
        <input type="text" name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Brief summary" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label>Content *</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required rows={10} placeholder="Full post content" />
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input type="url" name="image" value={formData.image} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default BlogForm;

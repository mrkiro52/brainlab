import React, { useState, useEffect } from 'react';
import '../../styles/Form.css';

function ProjectForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    status: 'active',
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear(),
    description: '',
    image: ''
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

      <div className="form-row">
        <div className="form-group">
          <label>Status *</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Year</label>
          <input type="number" name="startYear" value={formData.startYear} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>End Year</label>
          <input type="number" name="endYear" value={formData.endYear} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={5} />
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

export default ProjectForm;

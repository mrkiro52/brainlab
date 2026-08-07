import React, { useState, useEffect } from 'react';
import '../../styles/Form.css';

function CourseForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    level: '',
    duration: '',
    description: ''
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
          <label>Level *</label>
          <input type="text" name="level" value={formData.level} onChange={handleChange} placeholder="Beginner, Intermediate, Advanced" required />
        </div>
        <div className="form-group">
          <label>Duration *</label>
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 4 weeks" required />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={5} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default CourseForm;

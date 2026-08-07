import React, { useState, useEffect } from 'react';
import '../../styles/Form.css';

function TeamForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    photoUrl: '',
    email: '',
    category: 'Researchers'
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
        <label>Name *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Position *</label>
        <input type="text" name="position" value={formData.position} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Photo URL *</label>
        <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="https://example.com/photo.jpg" required />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Leadership">Leadership</option>
          <option value="Senior Researchers">Senior Researchers</option>
          <option value="Researchers">Researchers</option>
          <option value="PhD Students">PhD Students</option>
        </select>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default TeamForm;

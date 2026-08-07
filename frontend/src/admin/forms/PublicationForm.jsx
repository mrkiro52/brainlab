import React, { useState, useEffect } from 'react';
import '../../styles/Form.css';

function PublicationForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    description: '',
    image: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    venue: '',
    level: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        authors: Array.isArray(initialData.authors) ? initialData.authors.join(', ') : initialData.authors
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      authors: formData.authors.split(',').map(a => a.trim())
    };
    onSave(data);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Authors (comma-separated) *</label>
        <input
          type="text"
          name="authors"
          value={formData.authors}
          onChange={handleChange}
          placeholder="John Doe, Jane Smith"
          required
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Venue (e.g. NeurIPS 2024)</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="NeurIPS 2024"
          />
        </div>

        <div className="form-group">
          <label>Level (e.g. A*)</label>
          <input
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="A*, A, B"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default PublicationForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogForm from '../forms/BlogForm';
import '../../styles/Manager.css';

const API_URL = '/api';

function BlogManager({ token }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/blog`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`${API_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}/blog/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/blog`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowForm(false);
      setEditingId(null);
      setEditingData(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Blog Management</h2>
        <button className="btn btn-primary" onClick={() => {
          setEditingId(null);
          setEditingData(null);
          setShowForm(!showForm);
        }}>
          {showForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {showForm && (
        <BlogForm
          initialData={editingData}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="items-list">
          {items.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-content">
                <h3>{item.title}</h3>
                <p><strong>{item.category}</strong> by {item.author}</p>
                <p>{item.excerpt?.substring(0, 100)}...</p>
              </div>
              <div className="item-actions">
                <button className="btn btn-small btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-small btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogManager;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublicationForm from '../forms/PublicationForm';
import '../../styles/Manager.css';

const API_URL = '/api';

function PublicationManager({ token }) {
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
      const response = await axios.get(`${API_URL}/publications`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await axios.delete(`${API_URL}/publications/${id}`, {
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
        await axios.put(`${API_URL}/publications/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/publications`, formData, {
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
        <h2>Publications Management</h2>
        <button className="btn btn-primary" onClick={() => {
          setEditingId(null);
          setEditingData(null);
          setShowForm(!showForm);
        }}>
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showForm && (
        <PublicationForm
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
                <p>{item.authors?.join(', ')}</p>
                <p>{item.description?.substring(0, 100)}...</p>
              </div>
              <div className="item-actions">
                <button className="btn btn-small btn-edit" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-small btn-danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicationManager;

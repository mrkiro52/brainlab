const db = require('../utils/db');

const getAll = (req, res) => {
  try {
    const courses = db.read('courses');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = (req, res) => {
  try {
    const item = db.getById('courses', req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = (req, res) => {
  try {
    const { title, level, duration, description } = req.body;
    if (!title || !level || !duration) {
      return res.status(400).json({ error: 'Title, level, and duration required' });
    }
    const newItem = db.create('courses', { title, level, duration, description });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = (req, res) => {
  try {
    const updated = db.update('courses', req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = (req, res) => {
  try {
    db.remove('courses', req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };

const db = require('../utils/db');

const getAll = (req, res) => {
  try {
    const research = db.read('research');
    res.json(research);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = (req, res) => {
  try {
    const item = db.getById('research', req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }
    const newItem = db.create('research', { title, description, image });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = (req, res) => {
  try {
    const updated = db.update('research', req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = (req, res) => {
  try {
    db.remove('research', req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };

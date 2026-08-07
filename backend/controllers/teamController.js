const db = require('../utils/db');

const getAll = (req, res) => {
  try {
    const team = db.read('team');
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = (req, res) => {
  try {
    const item = db.getById('team', req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = (req, res) => {
  try {
    const { name, position, description, photoUrl, email, category } = req.body;
    if (!name || !position || !photoUrl) {
      return res.status(400).json({ error: 'Name, position, and photoUrl required' });
    }
    const newItem = db.create('team', { name, position, description, photoUrl, email, category });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = (req, res) => {
  try {
    const updated = db.update('team', req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = (req, res) => {
  try {
    db.remove('team', req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };

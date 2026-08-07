const db = require('../utils/db');

const getAll = (req, res) => {
  try {
    const publications = db.read('publications');
    res.json(publications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = (req, res) => {
  try {
    const item = db.getById('publications', req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = (req, res) => {
  try {
    const { title, authors, description, image, category, date, venue, level } = req.body;
    if (!title || !authors || !description) {
      return res.status(400).json({ error: 'Title, authors, and description required' });
    }
    const newItem = db.create('publications', {
      title,
      authors,
      description,
      image,
      category,
      date: date || new Date().toISOString(),
      venue,
      level
    });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = (req, res) => {
  try {
    const updated = db.update('publications', req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = (req, res) => {
  try {
    db.remove('publications', req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };

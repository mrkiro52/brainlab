const db = require('../utils/db');

const getAll = (req, res) => {
  try {
    const blog = db.read('blog');
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = (req, res) => {
  try {
    const item = db.getById('blog', req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = (req, res) => {
  try {
    const { title, content, excerpt, category, image, author } = req.body;
    if (!title || !content || !excerpt) {
      return res.status(400).json({ error: 'Title, content, and excerpt required' });
    }
    const newItem = db.create('blog', {
      title,
      content,
      excerpt,
      category,
      image,
      author: author || 'Admin',
      date: new Date().toISOString(),
      views: 0
    });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = (req, res) => {
  try {
    const updated = db.update('blog', req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = (req, res) => {
  try {
    db.remove('blog', req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };

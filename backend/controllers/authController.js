const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');
const db = require('../utils/db');

const login = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  try {
    const admins = db.read('admin');
    const admin = admins[0];

    if (!admin) {
      return res.status(401).json({ error: 'Admin not configured' });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(admin.id);
    res.json({ token, admin: { id: admin.id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setupAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const admins = db.read('admin');

    if (admins.length > 0) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = {
      id: 'admin_' + Date.now(),
      username,
      passwordHash
    };

    db.write('admin', [admin]);
    const token = generateToken(admin.id);

    res.json({
      message: 'Admin created successfully',
      token,
      admin: { id: admin.id, username: admin.username }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, setupAdmin };

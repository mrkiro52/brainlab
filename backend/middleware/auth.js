const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

if (!SECRET || SECRET.length < 32) {
  throw new Error(
    'JWT_SECRET is missing or too short. Set a random 32+ character value in backend/.env ' +
    '(e.g. `openssl rand -base64 32`). Refusing to start with a weak/default secret.'
  );
}

const generateToken = (adminId) => {
  return jwt.sign({ adminId }, SECRET, { expiresIn: '24h', algorithm: 'HS256' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET, { algorithms: ['HS256'] });
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken, SECRET };

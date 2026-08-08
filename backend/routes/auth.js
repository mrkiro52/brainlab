const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { login, setupAdmin } = require('../controllers/authController');

// Slows down credential-stuffing / brute-force attempts against the single
// admin account. Keyed by IP; counts only failed/attempted requests.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Try again later.' }
});

router.post('/login', authLimiter, login);
router.post('/setup', authLimiter, setupAdmin);

module.exports = router;

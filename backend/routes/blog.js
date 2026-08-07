const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getAll, getById, create, update, remove } = require('../controllers/blogController');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

module.exports = router;

const express = require('express');
const { getComments, postComment } = require('../controllers/commentController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:postId', getComments);
router.post('/:postId', protect, postComment);

module.exports = router;

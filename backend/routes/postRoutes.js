const express = require('express');
const {
  getPosts,
  getPost,
  addPost,
  editPost,
  removePost,
} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, addPost);
router.put('/:id', protect, editPost);
router.delete('/:id', protect, removePost);

module.exports = router;
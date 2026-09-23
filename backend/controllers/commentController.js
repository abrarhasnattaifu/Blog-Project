const { getCommentsByPostId, addComment } = require('../models/comment');

const getComments = async (req, res) => {
  try {
    const comments = await getCommentsByPostId(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postComment = async (req, res) => {
  try {
    const comment = await addComment(req.body.text, req.params.postId, req.user.id);
    res.status(201).json({ ...comment, author_name: req.user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getComments, postComment };
const {
    getPostById,
    getAllPosts,
    createPost,
    updatePost,
    deletePost
} = require('../models/Post');

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await createPost(title, content, req.user.id);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author_id !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed to edit this post' });
    }

    await updatePost(
      req.params.id,
      req.body.title || post.title,
      req.body.content || post.content
    );
    const updated = await getPostById(req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removePost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author_id !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed to delete this post' });
    }

    await deletePost(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, getPost, addPost, editPost, removePost };
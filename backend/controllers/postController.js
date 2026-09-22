const editPost = async (req, res) => {
  const post = await getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.author_id !== req.user.id) {
    return res.status(403).json({ message: 'Not allowed to edit this post' });
  }
};
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import CommentBox from '../components/CommentBox';
import { AuthContext } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  const fetchComments = async () => {
    const res = await api.get(`/comments/${id}`);
    setComments(res.data);
  };

  const handleAddComment = async (text) => {
    const res = await api.post(`/comments/${id}`, { text });
    setComments([res.data, ...comments]);
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this post?')) {
      await api.delete(`/posts/${id}`);
      navigate('/');
    }
  };

  if (!post) return <p className="center-text">Loading...</p>;

  const isOwner = user && post.author_id === user.id;

  return (
    <div className="container">
      <div className="post-full">
        <h2>{post.title}</h2>
        <p className="card-meta">By {post.author_name}</p>
        <p>{post.content}</p>
        {isOwner && (
          <div className="post-actions">
            <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
            <button onClick={handleDelete} className="danger">Delete</button>
          </div>
        )}
      </div>
      <CommentBox comments={comments} onAddComment={handleAddComment} />
    </div>
  );
};

export default PostDetail;

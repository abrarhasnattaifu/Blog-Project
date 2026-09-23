import { useEffect, useState } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="center-text">Loading posts...</p>;

  return (
    <div className="container">
      <h2>Latest Posts</h2>
      <div className="post-grid">
        {posts.length === 0 && <p>No posts yet. Be the first to write one!</p>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;

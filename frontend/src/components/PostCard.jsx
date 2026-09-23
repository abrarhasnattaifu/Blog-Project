import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p className="card-meta">By {post.author_name || 'Unknown'}</p>
      <p className="card-excerpt">{post.content.slice(0, 120)}...</p>
      <Link to={`/post/${post.id}`} className="read-more">Read More</Link>
    </div>
  );
};

export default PostCard;

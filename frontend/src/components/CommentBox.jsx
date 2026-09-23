import { useState } from 'react';

const CommentBox = ({ comments, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text);
    setText('');
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      <div className="comment-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <strong>{c.author_name || 'Anonymous'}:</strong> {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;

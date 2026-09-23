import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/posts', formData);
    navigate(`/post/${res.data.id}`);
  };

  return (
    <div className="form-container">
      <h2>Write a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="content" placeholder="Write your content here..." rows="8" onChange={handleChange} required />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;

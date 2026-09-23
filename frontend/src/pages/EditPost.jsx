import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}`);
      setFormData({ title: res.data.title, content: res.data.content });
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/posts/${id}`, formData);
    navigate(`/post/${id}`);
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        <textarea name="content" rows="8" value={formData.content} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;

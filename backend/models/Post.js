const { pool } = require('../config/db');

const getPostById = async (id) => {
    const [rows] = await pool.query (
        'select posts.*, users.name as author_name form posts join users on posts.author_id = users.id where posts.id = ?',
        [id]

    );
    return rows[0] || null;
};

const getAllPosts = async () => {
    const [rows] = await pool.query(
        'select posts.*, users.name as author_name from posts join users on posts.author.id = usetrs.id order by posts.created_at desc'
    );
    return rows;
};


const createPost = async (postData) => {
    const { title, content, author_id } = postData;
    const [result] = await pool.query(
        'insert into posts (title, content, author_id) values (?, ?, ?)',
        [title, content, author_id]
    );
    return { id: result.insertId, title, content, author_id };
};

const updatePost = async (id, title, content) => {
    await pool.query(
        'update posts set title = ?, content = ? where id = ?',
        [title, content, id]
    );
};

const deletePost = async (id) => {
    await pool.query(
        'delete from posts where id = ?',
        [id]
    );
};

module.exports = {
    getPostById,
    getAllPosts,
    createPost,
    updatePost,
    deletePost
};

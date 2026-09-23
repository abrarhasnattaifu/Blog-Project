const { pool } = require('../config/db');

const getCommentsByPostId = async (postId) => {
    const [rows] = await pool.query(
        'select comments.*, users.name as author_name from comments join users on comments.author_id = users.id where comments.post_id = ? order by comments.created_at desc',
        [postId]
    );
    return rows;
};

const addComment = async (text, post_id, author_id) => {
    const [result] = await pool.query(
        'insert into comments (text, post_id, author_id) values (?, ?, ?)',
        [text, post_id, author_id]
    );
    return { id: result.insertId, text, post_id, author_id };
};

module.exports = {
    getCommentsByPostId,
    addComment
};
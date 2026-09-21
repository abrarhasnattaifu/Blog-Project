const { pool } = require('../config/db');

const getCommentById = async (id) => {
    const [rows] = await pool.query(
        'select comments.*, users.name as author_name form comments join users on comments.author_id = users.id where comments.oist_id = ? order by comments.created_at desc',  
        [id]
    );
    return rows || null;
};

const addComment = async (commentData) => {
    const { content,  post_id, author_id } = commentData;
    const [result] = await pool.query (
        'insert into comments (content, post_id, author_id) values (?, ?, ?)',
        [content, post_id, author_id]
    );
    return { id: result.insertId, content, post_id, author_id };
};

module.exports = {
    getCommentById,
    addComment
};
const { pool } = require('../config/db');

const createUser = async (userData) => {
    const { name, email, password } = userData;
    const [result] = await pool.query(
        'insert into users (name, email, password) values (?, ?, ?)',
        [name, email, password]
    );
    return { id: result.insertId, name, email };
};

const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        'select * from users where email = ?',
        [email]
    );
    return rows[0] || null;
};

const findUserById = async (id) => {
    const [rows] = await pool.query(
        'select * from users where id = ?',
        [id]
    );
    return rows[0] || null;
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};
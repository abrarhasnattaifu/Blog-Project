const { pool } = require('../config/db');

const createUser = async (userData) => {
    const {username, email, password} = userData;
    const [result] = await pool.queary(
        'insert into users (username, email, password) values (?, ?, ?)',
        [username, email, password]
    );
    return { id: result.insertId, username, email };
};

const findUeserByEmail = async (email) => {
    const [rows] = await pool.query(
        'select * from users where email = ?',
        [email]
    );
    // console.log(rows);
    return rows[0] || null;
}

const findUserById = async (id) => {
    const [rows] = await pool.query(
        'select * form users wheare id = ?',
        [id]
    );
    return rows[0] || null;
}

module.exports = {
    createUser,
    findUeserByEmail,
    findUserById
};
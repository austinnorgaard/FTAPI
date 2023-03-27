const getUsers = `SELECT * FROM users ORDER BY id`;
const getUserByUserName = `SELECT * FROM users WHERE LOWER("userName") = $1`;
const getUserById = `SELECT * FROM users WHERE id = $1`;
const getLastUser = `SELECT MAX(id) FROM users`
const addUser = `INSERT INTO users (id, "firstName", "lastName", address1, address2, city, state, "zipCode", country, "phoneNumber", email, password, "createdAt", "userName") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
const checkEmailExists = `SELECT s FROM users s WHERE s.email = $1`;
const checkUserNameExists = `SELECT s FROM users s WHERE s."userName" = $1`;
const deleteUser = `DELETE FROM users WHERE LOWER("userName") = $1`;
const editUser = `UPDATE users SET "firstName" = $1, "lastName" = $2, address1 = $3, address2 = $4, city = $5, state = $6, "zipCode" = $7, country = $8, "phoneNumber" = $9, email = $10, password = $11, "createdAt" = $12, "userName" = $13 WHERE id = $14`;

module.exports = {
    getUsers,
    getUserByUserName,
    getUserById,
    getLastUser,
    addUser,
    checkEmailExists,
    checkUserNameExists,
    deleteUser,
    editUser,
};
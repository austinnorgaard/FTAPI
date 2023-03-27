const getUsers = `SELECT * FROM users ORDER BY id`;
const getUserByUserName = `SELECT * FROM users WHERE LOWER("userName") = $1`;
const getUserById = `SELECT * FROM users WHERE id = $1`;
const getLastUser = `SELECT MAX(id) FROM users`
const addUser = `INSERT INTO users (id, "subscribedToNewsletter", "firstName", "lastName", address1, address2, city, state, "zipCode", country, "phoneNumber", email, password, "createdAt", "userName") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
const checkEmailExists = `SELECT s FROM users s WHERE s.email = $1`;
const checkUserNameExists = `SELECT s FROM users s WHERE s."userName" = $1`;
const deleteUser = `DELETE FROM users WHERE LOWER("userName") = $1`;
const editUser = `UPDATE users SET "subscribedToNewsletter" = $1, "firstName" = $2, "lastName" = $3, address1 = $4, address2 = $5, city = $6, state = $7, "zipCode" = $8, country = $9, "phoneNumber" = $10, email = $11, password = $12, "createdAt" = $13, "userName" = $14 WHERE id = $15`;

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
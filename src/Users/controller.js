const pool = require('../../connection');
const bcrypt = require('bcrypt');
const queries = require('./queries');
const passport = require('passport');

const getUsers = (req, res) => {
    pool.query (queries.getUsers, (err, result) => {
        if (err) {
            throw err;
        };
        res.status(200).json(result.rows);
    });
};

const getUserByUserName = (req, res) => {
    const name = req.params.username;
    pool.query (queries.getUserByUserName, [name], (err, result) => {
        if (err) {
            throw err;
        }
        else if (!result.rows.length) {
            res.send("User not found!");
        }
        else {
            res.status(200).json(result.rows[0]);
        }
    });
};

const addUser = async (req, res) => {
    const {id, firstName, lastName, address1, address2, city, state, zipCode, country, phoneNumber, email, password, userName} = req.body;
    var hashedPass = await bcrypt.hash(password, 10);
    var time = JSON.stringify(new Date());

    if (!req.user) {
        pool.query(queries.checkEmailExists, [email], (err, result) => {
            if (result.rows.length) {
                res.send("User already exists!");
            }
            else {
                pool.query(queries.checkUserNameExists, [userName], (err, result) => {
                    if (result.rows.length) {
                        res.send("User already exists!");
                    }
                    else {
                        pool.query(queries.getUserById, [id], async (err, result) => {
                            var newId = id;
                            if (result.rows.length || id == null) {
                                newId = await pool.query(queries.getLastUser);
                                newId = newId.rows[0].max + 1
                            }
                            pool.query(queries.addUser, [newId, firstName, lastName, address1, address2, city, state, zipCode, country, phoneNumber, email, hashedPass, time, userName], (err, result) => {
                                if (err) {
                                    throw err;
                                };
                                res.status(201).send("User created!");
                            });
                        });
                    }
                });
            }
        });
    }
};

const removeUser = (req, res) => {
    const name = req.params.username;

    pool.query(queries.getUserByUserName, [name], (err, result) => {
        if (!result.rows.length) {
            res.send("User not found!");
        }
        else {
            pool.query(queries.deleteUser, [name], (err, result) => {
                if (err) {
                    throw err;
                };
                res.status(200).send("User deleted!");
            });
        }
    });
};

const editUser = (req, res) => {
    const name = req.params.username;
    var {firstName, lastName, address1, address2, city, state, zipCode, country, phoneNumber, email, password, createdAt, userName} = req.body;
    var User = {firstName, lastName, address1, address2, city, state, zipCode, country, phoneNumber, email, password, createdAt, userName};
    const properties = ["firstName", "lastName", "address1", "address2", "city", "state", "zipCode", "country", "phoneNumber", "email", "password", "createdAt", "userName"];

    if (req.user) {
        pool.query(queries.getUserByUserName, [name], async (err, result) => {
            if (!result.rows.length) {
                res.send("User not found!");
            }
            else {
                row = result.rows[0];
                if (User.password != undefined) {
                    User.password = await bcrypt.hash(User.password, 10);
                }
                for (let i = 0; i < properties.length; i++) {
                    let prop = properties[i];
                    if (User[prop] == undefined) {
                        User[prop]= row[prop];
                    }
                }
                pool.query(queries.editUser, [User.firstName, User.lastName, User.address1, User.address2, User.city, User.state, User.zipCode, User.country, User.phoneNumber, User.email, User.password, User.createdAt, User.userName, row.id], (err, result) => {
                    if (err) {
                        throw err;
                    };
                    res.status(200).send("User edited!")
                });
            }
        });
    }
    
};

module.exports = {
    getUsers,
    getUserByUserName,
    addUser,
    removeUser,
    editUser,
};
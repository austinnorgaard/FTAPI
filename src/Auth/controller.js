const pool = require('../../connection');
const userQuery = require('../Users/queries');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        pool.query (userQuery.getUserByUserName, [username], (err, result) => {
            if (err) {
                throw (err);
            }
            if (result.rows.length) {
                const user = result.rows[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw (err);
                    }
                    if (isMatch) {
                        return done (null, user);
                    }
                    else {
                        return done (null, false, {message: "Incorrect password!"});
                    }
                })
            }
            else {
                console.log("User does not exist");
                return done (null, false, {message: "User not found!"});
            }
        })
    }
    passport.use (new LocalStrategy (
        {
            usernameField: "username",
            passwordField: "password",
        },
        authenticateUser
    ))
    
    passport.serializeUser ((user, done) => done (null, user.id));

    passport.deserializeUser ((id, done) => {
        pool.query (userQuery.getUserById, [id], (err,results) => {
            if (err) {
                throw (err);
            }
            else {
                return done(null, results.rows);
            }
        })
    })
}

module.exports = initialize;
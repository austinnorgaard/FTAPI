require('dotenv').config();
const Client = require('pg').Pool;

const client = new Client ({
    host: process.env.HOST,
    user: process.env.DB_USER,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = client;
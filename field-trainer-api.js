require('dotenv').config();
const client = require('./connection');
const usersRouter = require('./src/Users/routes');
const authRouter = require('./src/Auth/routes');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const initPass = require('./src/Auth/controller');
const passport = require('passport');
const flash = require('express-flash');

const port = process.env.SERVER_PORT || 443;

initPass(passport);

app.set ("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SECRET,

    resave: false,

    saveUninitialized: false
}));
app.use (passport.initialize());
app.use(passport.session());

app.use (express.json ());
app.use(cors());
app.use(flash());

app.listen(port, () => {
    console.log (`Server is now listening on port: ${port}`);
});

app.get ('/', (req, res) => {
    res.sendStatus (200);
});

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return done(err); }
        res.redirect('/login');
      });
});

app.use('/login', authRouter);
app.use ('/user', usersRouter);
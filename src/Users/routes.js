const { Router } = require('express');
const controller = require('./controller');
const url = new URL('http://localhost:3300/user');

const router = new Router();

router.post('/register', (req, res) => {
    if (!req.isAuthenticated()) {
        controller.addUser (req, res);
        res.sendStatus(201);
    }
    else {
        res.sendStatus(400);
    }
});

router.get('/register', (req, res) => {
    if (!req.isAuthenticated()) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }
});

router.put(`/:username/settings`, (req, res) => {
    if (req.isAuthenticated()) {
        controller.editUser (req, res);
        res.sendStatus(202);
    }
    else {
        res.sendStatus(401);
    }
});
router.delete(`/:username/settings`, (req, res) => {
    if (req.isAuthenticated()) {
        controller.removeUser (req, res);
        res.sendStatus(202);
    }
    else {
        res.sendStatus(401);
    }
});
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(307);
        res.redirect('/user/' + (req.user[0].userName).toLowerCase());
    }
    else {
        res.sendStatus(401);
    }
});
router.get(`/:username`,(req, res) =>  {
    if (req.isAuthenticated()) {
        controller.getUserByUserName (req, res);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
});

module.exports = router;
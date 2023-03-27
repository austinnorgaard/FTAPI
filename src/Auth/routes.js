const { Router } = require('express');
const passport = require('passport');

const router = new Router();

router.post('/', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: false,
}));

router.get ('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }
})

module.exports = router;
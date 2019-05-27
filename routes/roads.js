const router = require('express').Router();
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/test', (req, res) => {
    res.render('new.html');
});

//Auth
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = router;
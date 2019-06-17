const express = require('express');
const router = express.Router();

router.get('/login',
    function (req, res) {
        res.render('login');
    });

router.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });

router.get('/signin',
    function (req, res) {
        res.render('sign-in', { user: req.user });
    });


router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('profile', { user: req.user });
    });

module.exports = router;
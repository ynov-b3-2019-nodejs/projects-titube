const express = require('express');
const router = express.Router();
const db = require('../db');

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
router.post('/signin',
    function (req, res) {
        //add user
        res.redirect('/');
    });

router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('profile', { user: req.user });
    });

module.exports = router;
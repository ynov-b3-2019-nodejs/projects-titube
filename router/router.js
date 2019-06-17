const express = require('express');
const router = express.Router();

router.get('/',
    function (req, res) {
        res.render('home', { user: req.user });
    });

router.get('/category',
    function (req, res) {
        res.render('category', { user: req.user, idCategory: req.idCategory, title: req.title });
    });

router.get('/video',
    function (req, res) {
        res.render('video', { user: req.user, idVideo: req.idVideo });
    });

router.get('/liste-videos',
    function (req, res) {
        res.render('list_videos', { user: req.user, idVideo: req.idVideo });
    });

router.get('/chat',
    function (req, res) {
        res.render('_chat');
    });

module.exports = router;
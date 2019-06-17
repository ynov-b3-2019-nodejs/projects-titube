const express = require('express');
const router = express.Router();
require('dotenv').config();

const db = require('../database/connection');


router.get('/',
    function (req, res) {
        const test = db.testVideo();
        console.log("Voici mon console log a mowa");
        console.log(test);

        //test_results.forEach(function(element) {
        //    console.log("Un element");
        //    console.log(element);
        //});


        res.render('home', { user: req.user, Title: "Coucou tu veux voir mon zizi", video_titre: "Titre de la video", video_category: "category",video_shortcode:"x3VuYVUpDMk", video_createur: "Yassine", video_thumbnail: "https://i.ytimg.com/vi/ghJktw2i93E/sddefault.jpg", createur_pp: "", video_desciption: "qwdsxacwefcsd" });
    });

router.get('/category',
    function (req, res) {
        res.render('category', { user: req.user, idCategory: req.idCategory, Title: req.title });
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
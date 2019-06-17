const express = require('express');
const router = express.Router();
require('dotenv').config();

const db = require('../database/connection');

router.get('/',
    async function (req, res) {
        const allvideos_query = await db.selectVideosTrends();
        const my_customarray_trends = [];
        const allvideos = allvideos_query.videos;
        allvideos.forEach(function (element) {
            //console.log(element);
            my_customarray_trends.push({ video_thumbnail: "\"" + element.thumbnail + "\"", video_titre: "\"" + element.id + "\"", video_createur: "Yassine", video_views: "12" });
        });

        const random_id_video = Math.floor(Math.random() * Math.floor(my_customarray_trends.length));
        const video_query = await db.selectVideoById(2);
        const video = video_query.video;

        //test_results.forEach(function(element) {
        //    console.log("Un element");
        //    console.log(element);
        //});

        res.render('home', {
            user: req.user, Title: "Coucou", video_id: video.id, video_titre: video.title, video_category: video.cat, video_shortcode: video.shortcode, video_createur: video.creator_name, createur_pp: video.creator_pp, video_thumbnail: video.thumbnail, video_desciption: video.description,
            trends: my_customarray_trends, videos_null: [{ video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12" }, { video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12" }, { video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-2", video_createur: "Yassine", video_views: "12" }, { video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12" }]
        });
    });

router.get('/category',
    function (req, res) {
        res.render('category', { user: req.user, idCategory: req.idCategory, Title: req.title });
    });

router.get('/video/:id',
    async function (req, res) {
        var id = req.params.id;

        const allvideos_query = await db.selectVideosTrends();
        const my_customarray_trends = [];
        const allvideos = allvideos_query.videos;
        allvideos.forEach(function (element) {
            //console.log(element);
            my_customarray_trends.push({ video_thumbnail: "\"" + element.thumbnail + "\"", video_titre: "\"" + element.id + "\"", video_createur: "Yassine", video_views: "12", video_id: element.id });
        });

        const video_query = await db.selectVideoById(id);
        const video = video_query.video;

        //test_results.forEach(function(element) {
        //    console.log("Un element");
        //    console.log(element);
        //});

        res.render('home', {
            user: req.user, Title: "Coucou", video_id: video.id, video_titre: video.title, video_category: video.cat, video_shortcode: video.shortcode, video_createur: video.creator_name, createur_pp: video.creator_pp, video_thumbnail: video.thumbnail, video_desciption: video.description,
            trends: my_customarray_trends, videos_null: [{ video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12" }, { video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12" }, { video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-2", video_createur: "Yassine", video_views: "12" }, { video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12" }]
        });
    });

router.get('/video',
    function (req, res) {
        res.render('video', { user: req.user, idVideo: req.idVideo });
    });

router.get('/liste-videos',
    function (req, res) {
        res.render('list_videos', { user: req.user, idVideo: req.idVideo });
    });

module.exports = router;
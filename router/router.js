const express = require('express');
const router = express.Router();
require('dotenv').config();

const db = require('../database/connection');

router.get('/',
    async function (req, res) {

        const allcategories_query = await db.selectCategoryAll();
        const my_customarray_categories=[];
        const allCategories = allcategories_query.categories;
        allCategories.forEach(function(categories) {
            my_customarray_categories.push({cat_label: categories.label });
        });


        const allvideos_query = await db.selectVideosTrends();
        const my_customarray_trends=[];
        const allvideos = allvideos_query.videos;
        allvideos.forEach(function(element) {
            my_customarray_trends.push({video_thumbnail: element.thumbnail , video_titre: element.title , video_createur: element.creator_name, video_views: element.views, video_id: element.id});
        });


        //const random_id_video = Math.floor(Math.random() * Math.floor(my_customarray_trends.length));
        const video_query = await db.selectVideoById(224);
        const video = video_query.video;



        res.render('home', { user: req.user, Title: "Home page", video_id: video.id, video_titre:  video.title, video_category:  video.cat ,video_shortcode: video.shortcode, video_createur: video.creator_name, createur_pp: video.creator_pp, video_thumbnail: video.thumbnail, video_desciption: video.description,
            trends: my_customarray_trends, cat:my_customarray_categories, videos_null: [{video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12"},{video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12"}, {video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-2", video_createur: "Yassine", video_views: "12"}, {video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12"}]});
    });

router.get('/video/:id',
        async function (req, res) {
            var id = req.params.id;

            const allcategories_query = await db.selectCategoryAll();
            const my_customarray_categories=[];
            console.log("JE SUIS ICI LA" + allcategories_query);
            const allCategories = allcategories_query.categories;
            allCategories.forEach(function(categories) {
                my_customarray_categories.push({cat_label: categories.label });
            });

            const allvideos_query = await db.selectVideosTrends();
            const my_customarray_trends=[];
            const allvideos = allvideos_query.videos;
            allvideos.forEach(function(element) {
                //console.log(element);
                my_customarray_trends.push({video_thumbnail: element.thumbnail , video_titre: element.title , video_createur: element.creator_name, video_views: element.views, video_id: element.id});
            });


            const video_query = await db.selectVideoById(id);
            const video = video_query.video;



            res.render('home', { user: req.user, Title: "Page", video_id: video.id, video_titre:  video.title, video_category:  video.cat ,video_shortcode: video.shortcode, video_createur: video.creator_name, createur_pp: video.creator_pp, video_thumbnail: video.thumbnail, video_desciption: video.description,
                cat:my_customarray_categories, trends: my_customarray_trends, videos_null: [{video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12"},{video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12"}, {video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-2", video_createur: "Yassine", video_views: "12"}, {video_thumbnail: "/src/img/tomb-raider.jpg", video_titre: "Titre de la video-1", video_createur: "Yassine", video_views: "12"}]});
        });

router.get('/liste-videos/:category',
    async function (req, res) {
        const category = req.params.category;
        const allcategories_query = await db.selectCategoryAll();
        const my_customarray_categories=[];
        console.log("JE SUIS ICI LA" + allcategories_query);
        const allCategories = allcategories_query.categories;
        allCategories.forEach(function(categories) {
            my_customarray_categories.push({cat_label: categories.label });
        });

        if (category === "Trends"){
            const allvideos_query = await db.selectAllVideosTrends();
            const my_customarray=[];
            const allvideos = allvideos_query.videos;
            allvideos.forEach(function(element) {
                my_customarray.push({cat:my_customarray_categories,video_thumbnail:  element.thumbnail , video_titre: element.title , video_createur: element.creator_name, video_views: element.views, video_id:  element.id });
            });

            res.render('list_videos', { user: req.user, Title: "Toutes les vidéos Tendance",cat:my_customarray_categories, videos: my_customarray});

        }
        else{
            const allvideos_query = await db.selectVideosByCategories(category);
            const my_customarray=[];
            const allvideos = allvideos_query.videos;
            allvideos.forEach(function(element) {
                my_customarray.push({video_thumbnail:  element.thumbnail , video_titre: element.title , video_createur: element.creator_name, video_views: element.views, video_id:  element.id });
            });

            res.render('list_videos', { user: req.user, Title: "Toutes les videos : " + category + "" ,cat:my_customarray_categories, videos: my_customarray});
        }

});

router.get('/chat',
    function (req, res) {
        res.render('_chat');
    });

module.exports = router;
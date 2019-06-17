const express = require('express');
const router = express.Router();

const db = require('../database/connection');

router.get('/login',
    async function (req, res) {
        const allcategories_query = await db.selectCategoryAll();
        const my_customarray_categories=[];
        const allCategories = allcategories_query.categories;
        allCategories.forEach(function(categories) {
            my_customarray_categories.push({cat_label: categories.label });
        });

        res.render('login',{cat:my_customarray_categories});
    });

router.get('/logout',
    async function (req, res) {
        const allcategories_query = await db.selectCategoryAll();
        const my_customarray_categories=[];
        const allCategories = allcategories_query.categories;
        allCategories.forEach(function(categories) {
            my_customarray_categories.push({cat_label: categories.label });
        });
        req.logout();
        res.redirect('/',{cat:my_customarray_categories});
    });

router.get('/signin',
    async function (req, res) {
        const allcategories_query = await db.selectCategoryAll();
        const my_customarray_categories=[];
        const allCategories = allcategories_query.categories;
        allCategories.forEach(function(categories) {
            my_customarray_categories.push({cat_label: categories.label });
        });
        res.render('sign-in', { user: req.user, cat:my_customarray_categories });
    });


router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    async function (req, res) {
        const allcategories_query = await db.selectCategoryAll();
        const my_customarray_categories=[];
        const allCategories = allcategories_query.categories;
        allCategories.forEach(function(categories) {
            my_customarray_categories.push({cat_label: categories.label });
        });
        res.render('profile', { user: req.user, cat:my_customarray_categories });
    });

module.exports = router;
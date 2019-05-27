const router = require('express').Router();
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/test', (req, res) => {
    res.render('new.html');
});



module.exports = router;
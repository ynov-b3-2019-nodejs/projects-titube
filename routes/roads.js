var router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/test', (req, res) => {
    res.render('new.html');
});

module.exports = router;

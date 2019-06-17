'use strict';
require('dotenv').config();
const db = require('./database/connection');
const express = require('express');
const authentification = require('./authentification');
const accountRouter = require('./router/accountRouter');
const router = require('./router/router');
const socket = require('./socket/socket');
const nunjucks = require('nunjucks');
require('dotenv').config();

// Create a new Express application.
const app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
nunjucks.configure('views', {
    express: app,
    autoescape: true
});
app.set('view engine', 'html');

// Static
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/customcss', express.static(__dirname + '/stylesheet'));
app.use('/src', express.static(__dirname + '/src'));

authentification(app);

app.use('/', router);
app.use('/account', accountRouter);

socket(app, db);

console.log('Test serveur lancee sur le serveur port 3000');
app.listen(process.env.PORT || 3000);

db.setConnection();
//db.selectUserById(4);
//db.selectUserByEmail("test@test.com");
//db.selectTrendByLabel('Sport');
//db.insertVideo('titre', 'une description', 10, 37, 99, 'https://i.ytimg.com/vi/ghJktw2i93E/sddefault.jpg', 1, 1);
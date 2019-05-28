'use strict';

require('dotenv').config();

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

// Static CSS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

authentification(app);

app.use('/', router);
app.use('/account', accountRouter);

socket(app);

console.log('Test serveur lancee sur le serveur port 3000');
app.listen(process.env.PORT || 3000);

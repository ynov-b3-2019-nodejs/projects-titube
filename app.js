'use strict';
require('dotenv').config();
const db = require('./database/connection');
const express = require('express');
const authentification = require('./authentification');
const accountRouter = require('./router/accountRouter');
const router = require('./router/router');
const socket = require('./socket/socket');
const nunjucks = require('nunjucks');
const { createServer } = require('http');
require('dotenv').config();

// Create a new Express application.
const app = express();

const http = createServer(app)

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

db.setConnection();

authentification(app, db);

app.use('/', router);
app.use('/account', accountRouter);

socket(http, db);

http.listen(process.env.PORT || 3000);
console.log('Serveur lancee sur le serveur port ', process.env.PORT || 3000);
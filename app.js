'use strict';
var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/mk', express.static(__dirname + '/node_modules/leaflet.markercluster/dist'));
app.use('/ls', express.static(__dirname + '/node_modules/leaflet-search'));

app.use('/customcss', express.static(__dirname + '/src/style'));
app.use('/script', express.static(__dirname + '/src/scripts'));

app.use('/', require('./routes/roads'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('Test serveur lancee sur le serveur port 3000');
app.listen(process.env.PORT || 5000);
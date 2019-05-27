'use strict';

require('dotenv').config();

const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env['DATABASE_URL'], {
    dialectOptions: {
        ssl: true
    }
});


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

console.log('Test serveur lancé sur le serveur port 5000');
app.listen(process.env.PORT || 5000);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const YtVideo = require('./ytvideo');
const Sequelize = require('sequelize');
const {sequelize} = require('../database/connection');

class Trend extends Sequelize.Model {}
Trend.init({
  // attributes
  libelle: {
    type: Sequelize.STRING,
  }
}, {
  sequelize,
  modelName: 'trend'
});

Trend.hasMany(YtVideo);

module.exports = Trend;

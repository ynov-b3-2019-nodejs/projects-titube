const YtVideo = require('./ytvideo');
const Sequelize = require('sequelize');
const {sequelize} = require('../database/connection');

class Category extends Sequelize.Model {}
Category.init({
  // attributes
  libelle: {
    type: Sequelize.STRING,
  }
}, {
  sequelize,
  modelName: 'category'
});

Category.hasMany(YtVideo);

module.exports = Category;

const Sequelize = require('sequelize');

const Category = require('./category');
const Trend = require('./trend');
const Comment = require('./comment');
const {sequelize} = require('../database/connection');

class YtVideo extends Sequelize.Model {}
YtVideo.init({
  // attributes
  timestamp: true,
  createdAt: true,
  updatedAt: false,
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  like: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  unlike: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  timestamp: {
    type: Sequelize.DataTypes.TIME,
    allowNull: false
  },
  views: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  thumbnail: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'ytvideo'
  // options
});

YtVideo.hasOne(Category);
YtVideo.hasOne(Trend);
YtVideo.hasMany(Comment);

module.exports = YtVideo;

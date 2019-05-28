'use strict';
const sequelize = require('sequelize');
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    unlikes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING
  }, {});
  Video.associate = models => {
    Video.belongsTo(models.Category);
    Video.belongsTo(models.Trend);
    Video.hasMany(models.Comment);
  };
  return Video;
};
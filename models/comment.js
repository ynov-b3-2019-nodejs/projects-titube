const YtVideo = require('./ytvideo');
const Sequelize = require('sequelize');
const {sequelize} = require('../database/connection');

class Comment extends Sequelize.Model {}
Comment.init({
  // attributes
  content: {
    type: Sequelize.STRING,
  }
}, {
  sequelize,
  modelName: 'comment'
});

Comment.hasOne(YtVideo);

module.exports = Comment;

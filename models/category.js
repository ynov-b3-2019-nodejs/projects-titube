'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    label: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Video);
  };
  return Category;
};
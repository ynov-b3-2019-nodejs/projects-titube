'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trend = sequelize.define('Trend', {
    label: DataTypes.STRING
  }, {});
  Trend.associate = models => {
    Trend.hasMany(models.Video);
  };
  return Trend;
};
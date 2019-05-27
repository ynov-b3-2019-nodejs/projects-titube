import { DataTypes } from "sequelize/types";

const Model = Sequelize.Model;
class Video extends Model {}
Video.init({
  // attributes
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unlike: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.TIME,
    allowNull: false
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  thumbnail: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'video'
  // options
});
Video.hasOne(Category);
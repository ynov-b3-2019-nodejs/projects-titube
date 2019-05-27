const Model = Sequelize.Model;
class Trend extends Model {}
User.init({
  // attributes
  libelle: {
    type: Sequelize.STRING,
  }
}, {
  sequelize,
  modelName: 'trend'
});


const Model = Sequelize.Model;
class Category extends Model {}
User.init({
  // attributes
  libelle: {
    type: Sequelize.STRING,
  }
}, {
  sequelize,
  modelName: 'category'
});

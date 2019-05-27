const Model = Sequelize.Model;
class User extends Model {}
User.init({
  // attributes
  login: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING
  },
  mail: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user'
});
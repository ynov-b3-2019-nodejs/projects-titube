const Sequelize = require('sequelize');
class User extends Sequelize.Model {}
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

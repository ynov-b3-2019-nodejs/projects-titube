const Model = Sequelize.Model;
class Comment extends Model {}
User.init({
  // attributes
  content: {
    type: Sequelize.STRING,
  }
}, {
  sequelize,
  modelName: 'comment'
});

const Sequelize = require('sequelize');
const DB_URL = process.env['DATABASE_URL'];
const sequelize = new Sequelize(DB_URL, {
    dialectOptions: {
        ssl: true
    }
});

module.exports = {
    sequelize,
    setConnection: function () {
        sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    },
    closeConnection: function () {
        sequelize.close()
        .then(() => {
            console.log('Connection successfuly closed.');
        });
    },
}

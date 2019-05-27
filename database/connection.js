const Sequelize = require('sequelize');
const DB_URL = process.env['DATABASE_URL'];

module.exports = {
    setConnection: function () {
        const sequelize = new Sequelize(DB_URL, {
            dialectOptions: {
                ssl: true
            }
        });

        sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }   
}
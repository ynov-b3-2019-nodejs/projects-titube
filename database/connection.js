const DB_URL = process.env['DATABASE_URL'];
const pg = require('pg');
const client = new pg.Client({
    user: "avwkieahxulqja",
    password: "099c825a39815259d90e195d6b8881bf0a0228f3515106e6729d43e1a40bb0cb",
    database: "d460oslt8pgjm6",
    port: 5432,
    host: "ec2-54-247-96-169.eu-west-1.compute.amazonaws.com",
    ssl: true
}); 

module.exports = {
    setConnection: function () {
        client.connect().then( () => {
        console.log("Connection suceessfuly established.");
    });
    },
    closeConnection: function () {
        client.end()
        .then(() => {
            console.log('Connection successfuly closed.');
        });
    },
    testQuery: function () {
        client.query("SELECT * FROM trend", (err, res) => {
            console.log(err, res);
        });
    }
}

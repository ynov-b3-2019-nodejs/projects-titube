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
    },
    selectUserById: function (id) {
        client.query('SELECT * FROM public."User" WHERE id=' + id, (err, res) => {
            console.log("UserById:", err, res.rows);
        });
    },
    selectUserByEmail: function (email) {
        client.query('SELECT * FROM public."User" WHERE email=' + email, (err, res) => {
            console.log("UserByEmail:", err, res);
        });
    },
    insertUser: function (username, email, password) {
        client.query('INSERT INTO public."User" (username, email, password, "createdAt", "updatedAt") VALUES (\''+ username + '\',\'' + email +'\',\'' + password +'\', NOW(), NOW())', (err, res) => {
            console.log(err, res);
        });
    },
    insertCategory: function (name) {
        client.query('INSERT INTO public."Category" (label, "createdAt", "updatedAt") VALUES (\''+ label + '\', NOW(), NOW())', (err, res) => {
            console.log(err, res);
        });
    },
    insertComment: function (content, videoId) {
        client.query('INSERT INTO public."Comment" (content, "videoId", "createdAt", "updatedAt") VALUES (\''+ content + '\',\'' + videoId +'\',NOW(), NOW())', (err, res) => {
            console.log(err, res);
        });
    },
    insertTrend: function (label) {
        client.query('INSERT INTO public."Trend" (label, createdAt", "updatedAt") VALUES (\''+ label + '\',NOW(), NOW())', (err, res) => {
            console.log(err, res);
        });
    },
    insertVideo: function (title, description, likes, unlikes, views, thumbnail, categoryId, trendId) {
        client.query('INSERT INTO public."Video" (title, description, likes, unlikes, views, thumbnail, "createdAt", "updatedAt", "categoryId", "trendId") VALUES (\''+ title + '\',\'' + description +'\',\'' + likes +'\',\'' + unlikes +'\',\'' + views +'\',\'' + thumbnail +'\',NOW(), NOW(),\'' + categoryId +'\', \'' + trendId +'\')', (err, res) => {
            console.log(err, res);
        });
    },
}

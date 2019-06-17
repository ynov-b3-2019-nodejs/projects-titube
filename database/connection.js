const pg = require('pg');
const client = new pg.Client({
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Name,
    port: process.env.DB_Port,
    host: process.env.DB_Host,
    ssl: true
});

module.exports = {
    setConnection: function () {
        client.connect().then(() => {
            console.log("Connection suceessfuly established.");
        });
    },

    testVideo: function () {
        client.query('SELECT * FROM public."Video"', (err, res) => {
            console.log(err, res);
            return(res);
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
    selectUserByEmail: function (mail) {
        client.query("SELECT * FROM public.\"User\" WHERE email LIKE " + mail, (err, res) => {
            console.log("UserByEmail:", err, res);
        });
    },
    selectTrendByLabel: function (trend) {
        client.query('SELECT * FROM public."Trend" WHERE label LIKE ' + trend, (err, res) => {
            console.log("TrendByLabel:", err, res);
        });
    },
    insertUser: function (username, email, password) {
        client.query('INSERT INTO public."User" (username, email, password, "createdAt", "updatedAt") VALUES (\'' + username + '\',\'' + email + '\',\'' + password + '\', NOW(), NOW())', (err, res) => {
            console.log(err, res);
        });
    },
    insertCategory: function (name) {
        client.query('INSERT INTO public."Category" (label, "createdAt", "updatedAt") VALUES (\'' + label + '\', NOW(), NOW())', (err, res) => {
            console.log(err, res);
        });
    },
    insertComment: function (content, videoId) {
        client.query('INSERT INTO public."Comment" (content, "videoId", "createdAt", "updatedAt") VALUES (\'' + content + '\',\'' + videoId + '\',NOW(), NOW())', (err, res) => {
            console.log(err, res);
        });
    },
    insertTrend: function (label) {
        client.query('INSERT INTO public."Trend" (label, createdAt", "updatedAt") VALUES (\'' + label + '\',NOW(), NOW())', (err, res) => {
            console.log(err, res);
        });
    },
    insertVideo: function (title, description, likes, unlikes, views, thumbnail, categoryId, trendId) {
        client.query('INSERT INTO public."Video" (title, description, likes, unlikes, views, thumbnail, "createdAt", "updatedAt", "categoryId", "trendId") VALUES (\'' + title + '\',\'' + description + '\',\'' + likes + '\',\'' + unlikes + '\',\'' + views + '\',\'' + thumbnail + '\',NOW(), NOW(),\'' + categoryId + '\', \'' + trendId + '\')', (err, res) => {
            console.log(err, res);
        });
    },

}
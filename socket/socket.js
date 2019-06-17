module.exports = function (app, db) {
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/view/_like.html');
    });

    socket.on('like_request', async function (userId, videoId) {
        if ((await db.likeVideo(userId, videoId)).err === null) {
            socket.emit('like', 1);
        }
    });
    socket.on('unlike_request', function (userId, number) {
        if ((await db.likeVideo(userId, unlike)).err === null) {
            socket.emit('unlike', 1);
        }
    });

    http.listen(4000, function () {
        console.log('socket listening on *:4000');
    });
}
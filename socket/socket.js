module.exports = function (app, db) {
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/view/_like.html');
    });

    socket.on('like_request', function (userId, number) {
        if (db.selectUserById(userId))
    });
    socket.on('unlike_request', function (userId, number) {
    });

    http.listen(4000, function () {
        console.log('socket listening on *:4000');
    });
}
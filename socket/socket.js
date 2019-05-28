module.exports = function (app) {
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/view/_chat.html');
    });

    function myfunction() {
        io.emit('chat message', msg);
    }

    http.listen(4000, function () {
        console.log('socket listening on *:4000');
    });
}
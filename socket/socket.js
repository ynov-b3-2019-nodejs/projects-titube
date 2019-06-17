module.exports = function (http, db) {
    const io = require('socket.io')(http);

    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('like_request', async function (userId, videoId) {
            console.log("like_request", userId, videoId);
            if ((await db.likeVideo(userId, videoId)).err === null) {
                socket.emit('like', (await db.countLikeVideo(videoId)).number);
                console.log("like", userId, videoId);
            }
        });
        socket.on('unlike_request', async function (userId, videoId) {
            console.log("unlike_request", userId, videoId);
            if ((await db.likeVideo(userId, videoId)).err === null) {
                socket.emit('unlike', (await db.countunLikeVideo(videoId)).number);
                console.log("unlike", userId, videoId);
            }
        });
    });
}
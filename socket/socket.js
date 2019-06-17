module.exports = function (http, db) {
    const io = require('socket.io')(http);

    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('likeAndUnlike_request', async function (videoId) {
            socket.emit('like', { number: (await db.countLikeVideo(videoId)).number });
            socket.emit('unlike', {  number: (await db.countUnLikeVideo(videoId)).number });
        });

        socket.on('like_request', async function (userId, videoId) {
            console.log("like_request", userId, videoId);

            const hasLikeOrUnlike = await db.hasLikeOrUnlike(userId, videoId);
            if (!hasLikeOrUnlike.err) {
                if (hasLikeOrUnlike.like == true) {
                    await db.deleteLikeOrUnlike(userId, videoId);
                    io.emit('like', { for: 'everyone', number: (await db.countLikeVideo(videoId)).number });
                    io.emit('unlike', { for: 'everyone', number: (await db.countUnLikeVideo(videoId)).number });
                    return;
                }

                if (hasLikeOrUnlike.unlike == true) {
                    await db.deleteLikeOrUnlike(userId, videoId);
                }
                const likeVideo = await db.likeVideo(userId, videoId);
                if (!likeVideo.err) {
                    io.emit('like', { for: 'everyone', number: (await db.countLikeVideo(videoId)).number });
                    io.emit('unlike', { for: 'everyone', number: (await db.countUnLikeVideo(videoId)).number });
                    console.log("like", userId, videoId);
                    return;
                }
            }
            await db.deleteLikeOrUnlike(userId, videoId);
            io.emit('like', { for: 'everyone', number: (await db.countLikeVideo(videoId)).number });
            io.emit('unlike', { for: 'everyone', number: (await db.countUnLikeVideo(videoId)).number });
        });
        socket.on('unlike_request', async function (userId, videoId) {
            console.log("unlike_request", userId, videoId);
            const hasLikeOrUnlike = await db.hasLikeOrUnlike(userId, videoId);
            if (!hasLikeOrUnlike.err) {
                if (hasLikeOrUnlike.unlike == true) {
                    await db.deleteLikeOrUnlike(userId, videoId);
                    io.emit('like', { for: 'everyone', number: (await db.countLikeVideo(videoId)).number });
                    io.emit('unlike', { for: 'everyone', number: (await db.countUnLikeVideo(videoId)).number });
                    return;
                }

                if (hasLikeOrUnlike.like == true) {
                    await db.deleteLikeOrUnlike(userId, videoId);
                }
                const likeVideo = await db.unLikeVideo(userId, videoId);
                if (!likeVideo.err) {
                    io.emit('like', { for: 'everyone', number: (await db.countLikeVideo(videoId)).number });
                    io.emit('unlike', { for: 'everyone', number: (await db.countUnLikeVideo(videoId)).number });
                    console.log("unlike", userId, videoId);
                    return;
                }
            }
            await db.deleteLikeOrUnlike(userId, videoId);
            io.emit('like', { for: 'everyone', number: (await db.countLikeVideo(videoId)).number });
            io.emit('unlike', { for: 'everyone', number: (await db.countUnLikeVideo(videoId)).number });
        });
    });
}
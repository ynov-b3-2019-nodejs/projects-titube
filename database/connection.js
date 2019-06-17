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
    async selectVideoById(id) {
        try {
            const res = await client.query('SELECT * FROM public."Video" WHERE id=\'' + id + '\'');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, video: null };
            }

            if (res.rowCount === 1) {
                return { err: null, video: res.rows[0] };
            }
            console.log("error to much video");
            return { err: "error to much video", video: null };
        } catch (e) {
            console.log(e);
            return { err: e, video: null };
        }
    },
    async selectCategoryAll() {
        try {
            const res = await client.query('SELECT * FROM public."Categorie"');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, categories: null };
            }
            return { err: null, categories: res.rows };
        } catch (e) {
            console.log(e);
            return { err: e, categories: null };
        }
    },
    async selectVideoAll() {
        try {
            const res = await client.query('SELECT * FROM public."Video"');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, videos: null };
            }
            return { err: null, videos: res.rows };
        } catch (e) {
            console.log(e);
            return { err: e, videos: null };
        }
    },
    async selectAllVideosTrends() {
        try {
            const res = await client.query('SELECT * FROM public."Video" WHERE on_trend=true');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, videos: null };
            }
            return { err: null, videos: res.rows };
        } catch (e) {
            console.log(e);
            return { err: e, videos: null };
        }
    },
    async selectVideosByCategories(category) {
        try {
            const res = await client.query('SELECT * FROM public."Video" WHERE cat=\'' + category + '\'');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, videos: null };
            }
            return { err: null, videos: res.rows };
        } catch (e) {
            console.log(e);
            return { err: e, videos: null };
        }
    },
    async selectVideosTrends() {
        try {
            const res = await client.query('SELECT * FROM public."Video" WHERE on_trend=true LIMIT 4');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, videos: null };
            }
            return { err: null, videos: res.rows };
        } catch (e) {
            console.log(e);
            return { err: e, videos: null };
        }
    },
    async selectUserByUsername(username) {
        try {
            const res = await client.query('SELECT * FROM public."User" WHERE username=\'' + username + '\'');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, user: null };
            }

            if (res.rowCount === 1) {
                return { err: null, user: res.rows[0] };
            }
            console.log("error to much user")
            return { err: "error to much user", user: null };
        } catch (e) {
            console.log(e);
            return { err: e, user: null };
        }
    },
    async selectUserById(id) {
        try {
            const res = await client.query('SELECT * FROM public."User" WHERE id=\'' + id + '\'');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, user: null };
            }

            if (res.rowCount === 1) {
                return { err: null, user: res.rows[0] };
            }
            console.log("error to much user")
            return { err: "error to much user", user: null };
        } catch (e) {
            console.log(e);
            return { err: e, user: null };
        }
    },
    async InsertCategorie(id, label) {
        try {
            const res = await client.query('INSERT INTO public."Categorie" (id, label) VALUES ( \'' + id + '\', \'' + label + '\')');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, user: null };
            }

            if (res.rowCount === 1) {
                return { err: null, user: res.rows[0] };
            }
            console.log("error to much user")
            return { err: "error to much user", user: null };
        } catch (e) {
            console.log(e);
            return { err: e, user: null };
        }
    },
    async InsertVideos(categorie, description, creator_name, shortcode, title, views, thumbnail) {
        try {
            function replace_caractere(str) {
                //const result = str.replace('\\', ' ').replace('\'', ' ').replace('\`', ' ').replace('\"', ' ').replace('\'', ' ').replace('\\\'', ' ');
                return str;
            }
            const new_titre = replace_caractere(title);
            const new_description = replace_caractere(description);

            const res = await client.query('INSERT INTO public."Video" (cat,description, creator_name, shortcode, title, views, thumbnail ) VALUES ( \'' + categorie + '\', $$' + new_description + '$$, \'' + creator_name + '\', \''+ shortcode + '\', $$'+ new_titre+'$$, \''+ views +'\',\''+ thumbnail +'\' )');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, user: null };
            }

            if (res.rowCount === 1) {
                return { err: null, user: res.rows[0] };
            }
            console.log("error to much user")
            return { err: "error to much user", user: null };
        } catch (e) {
            console.log(e);
            return { err: e, user: null };
        }
    },
    async CategorieById(id) {
        try {
            const res = await client.query('SELECT label FROM public."Categorie" WHERE id=( \'' + id + '\')');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: res, user: null };
            }

            if (res.rowCount === 1) {
                return { err: null, user: res.rows[0] };
            }
            console.log("error to much user")
            return { err: "error to much user", user: null };
        } catch (e) {
            console.log(e);
            return { err: e, user: null };
        }
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
    async deleteLikeOrUnlike(userId, videoId) {
        try {
            await client.query('DELETE FROM public."UserLike" WHERE userid=\'' + userId + '\' AND videoid=\'' + videoId + '\'');
            return { err: null };
        } catch (e) {
            console.log(e);
            return { err: e };
        }
    },
    async hasLikeOrUnlike(userId, videoId) {
        try {
            const res = await client.query('SELECT * FROM public."UserLike" WHERE userid=\'' + userId + '\' AND videoid=\'' + videoId + '\'');
            console.log(res);

            if (res.rowCount === 0) {
                return { err: null, like: false, unlike: false };
            }

            if (res.rowCount === 1) {
                if (res.rows[0].has_like_unlike === true) {
                    return { err: null, like: true, unlike: false };
                }
                return { err: null, like: false, unlike: true };
            }
            console.log("error to much row")
            return { err: "error to much row", like: null, unlike: null };
        } catch (e) {
            console.log(e);
            return { err: e, like: null, unlike: null };
        }
    },
    async likeVideo(userId, videoId) {
        try {
            const res = await client.query('SELECT * FROM public."UserLike" WHERE userid=\'' + userId + '\' AND videoid=\'' + videoId + '\'');

            if (res.rowCount === 0) {
                await client.query('INSERT INTO public."UserLike" (userid, videoid, has_like_unlike) VALUES (\'' + userId + '\',\'' + videoId + '\',\'' + true + '\')')
                return { err: null };
            }
            await this.deleteLikeOrUnlike(userId, videoId);
            await client.query('INSERT INTO public."UserLike" (userid, videoid, has_like_unlike) VALUES (\'' + userId + '\',\'' + videoId + '\',\'' + true + '\')')
            return { err: null };
        } catch (e) {
            console.log(e);
            return { err: e };
        }
    },
    async unLikeVideo(userId, videoId) {
        try {
            const res = await client.query('SELECT * FROM public."UserLike" WHERE userid=\'' + userId + '\' AND videoid=\'' + videoId + '\'');

            if (res.rowCount === 0) {
                await client.query('INSERT INTO public."UserLike" (userid, videoid, has_like_unlike) VALUES (\'' + userId + '\',\'' + videoId + '\',\'' + false + '\')')
                return { err: null };
            }
            await this.deleteLikeOrUnlike(userId, videoId);
            await client.query('INSERT INTO public."UserLike" (userid, videoid, has_like_unlike) VALUES (\'' + userId + '\',\'' + videoId + '\',\'' + false + '\')')
            return { err: null };
        } catch (e) {
            console.log(e);
            return { err: e };
        }
    },
    async countLikeVideo(videoId) {
        try {
            const res = await client.query('SELECT COUNT(*) FROM public."UserLike" WHERE has_like_unlike=true AND videoid=\'' + videoId + '\'');

            return { err: null, number: res.rows[0].count };
        } catch (e) {
            console.log(e);
            return { err: e };
        }
    },
    async countUnLikeVideo(videoId) {
        try {
            const res = await client.query('SELECT COUNT(*) FROM public."UserLike" WHERE has_like_unlike=false AND videoid=\'' + videoId + '\'');

            return { err: null, number: res.rows[0].count };
        } catch (e) {
            console.log(e);
            return { err: e };
        }
    },
}
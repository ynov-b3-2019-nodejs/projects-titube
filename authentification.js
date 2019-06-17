module.exports = function (app, db) {
    const passport = require('passport');
    const Strategy = require('passport-local').Strategy;
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    // Configure the local strategy for use by Passport.
    //
    // The local strategy require a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(new Strategy(
        async function (username, password, done) {
            const res = await db.selectUserByUsername(username);
            if (!res) { return done(err); }
            if (!res.user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (res.user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, res.user);
        }
    ));

    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_AUTH_ID,
        clientSecret: process.env.GOOGLE_AUTH_SECRET,
        callbackURL: process.env.HEROKU_LINK || 'http://localhost:3000/account/auth/google/callback'
    },
        async function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            if ((await db.selectUserByUsername(profile._json.email)).user == null) {
                db.insertUser(profile._json.email, profile._json.email, null);
                return done(null, { id: (await db.selectUserByUsername(profile._json.email)).user.id, username: profile.displayName, password: '', displayName: profile.displayName, emails: [{ value: profile._json.email }] });
            }
            return done(null, { id: (await db.selectUserByUsername(profile._json.email)).user.id, username: profile.displayName, password: '', displayName: profile.displayName, emails: [{ value: profile._json.email }] });
        }
    ));

    // Use application-level middleware for common functionality, including
    // logging, parsing, and session handling.
    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());

    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(async function (id, cb) {
        const res = await db.selectUserById(id);
        if (res.err) { return cb(res.err); }
        cb(null, res.user);
    });
    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    app.get('/account/auth/google',
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }));

    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/account/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/account/login' }),
        function (req, res) {
            res.redirect('/');
        });

    app.post('/account/login',
        passport.authenticate('local', { failureRedirect: '/account/login' }),
        function (req, res) {
            res.redirect('/');
        });

    app.post('/account/signin',
        async function (req, res) {
            if (req.body) {
                if (req.body.password === req.body["retype-password"] && req.body.password.length >= 6) {
                    if ((await db.selectUserByUsername(req.body.username)).user == null) {
                        db.insertUser(req.body.username, req.body.email, req.body.password);
                        res.redirect('/');
                    }
                }
            }

            res.redirect('/account/signin');
        });
};
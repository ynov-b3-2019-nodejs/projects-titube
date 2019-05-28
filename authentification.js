module.exports = function (app) {
    const passport = require('passport');
    const Strategy = require('passport-local').Strategy;
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const db = require('./db');
    console.log(db);

    // Configure the local strategy for use by Passport.
    //
    // The local strategy require a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(new Strategy(
        function (username, password, done) {
            db.users.findByUsername(username, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.passport === password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
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
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            return done(null, { id: profile._json.email, username: profile.displayName, password: '', displayName: profile.displayName, emails: [{ value: profile._json.email }] });
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

    passport.deserializeUser(function (id, cb) {
        db.users.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
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
};
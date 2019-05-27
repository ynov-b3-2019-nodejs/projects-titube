'use strict';
const express = require('express');
const nunjucks = require('nunjucks');

//Google auth
const GOOGLE_CLIENT_ID = '611630368524-kp8al13mr6khm1qkjhvuc8phfa31vqsp.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'eRe0mqLESAWhlG4LNtyCQqly';

const app = express();
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const session = require("express-session"),
    bodyParser = require("body-parser");

let User = [{ username: 'username', password: 'password' }, { username: 'username2', password: 'password' }];

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const flash = require('connect-flash');
app.use(flash());

app.use(express.cookieParser());
app.use(express.session({ secret: "secret" }));

//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions

app.use(flash());
app.use(app.router);
app.use(express.static('public'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://accounts.google.com/o/oauth2/auth"
},
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return done(err, user);
        });
    }
));

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.find({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.password === password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/mk', express.static(__dirname + '/node_modules/leaflet.markercluster/dist'));
app.use('/ls', express.static(__dirname + '/node_modules/leaflet-search'));

app.use('/customcss', express.static(__dirname + '/src/style'));
app.use('/script', express.static(__dirname + '/src/scripts'));
app.use('/', require('./routes/roads'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('Test serveur lancee sur le serveur port 3000');
app.listen(process.env.PORT || 3000);
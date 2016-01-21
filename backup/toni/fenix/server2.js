var express = require("express");
var passport = require("passport");
var OAuth2Strategy = require("passport-oauth2").Strategy;
var fenix = require("./fenix");
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var configDB = require('./config/database.js');

// DB configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/toni'); // connect to our database


var User = mongoose.model('Users', {
    username:       String,
    accessToken:    String,
    refreshToken:    String
});

// ===============================================================
app = express();

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));


// required for passport
app.use(require('express-session')({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session




OAuth2Strategy.prototype.userProfile = function(token,done){
    fenix.person(token,function(err,res){
        return done(null, {username: res.username});
    });
}



// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log("serialize ")
    done(null, user.username);
});

// used to deserialize the user
passport.deserializeUser(function(username, done) {
    User.find({username : username}, function(err, user) {
        done(err, user[0]);
    });
});

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://fenix.tecnico.ulisboa.pt/oauth/userdialog',
    tokenURL: 'https://fenix.tecnico.ulisboa.pt/oauth/access_token',
    clientID: "1132965128044570",
    clientSecret: "FJL67JqPbgJrD7bBfdnTUdvFB7SYTwhpfyw09cMtiiytD8BsMs1LWVGTkA2Y4H5RyB0AmdqqL24c4d8Nr8DETw==",
    callbackURL: "http://shelf.n1z.pt:3001/auth/fenix/callback"
},
function(accessToken, refreshToken, profile, done) {
    console.log({access_token:accessToken,refresh_token: refreshToken, profile: profile});
    User.create({
        username : profile.username,
        accessToken : accessToken,
        refreshToken : refreshToken
    }, function(err,user){
        return done(null, user);
    })
    
}
));






///////////////////////expressssss////////////////////////////////
app.get('/auth/fenix',
    passport.authenticate('oauth2'));

app.get('/auth/fenix/callback',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    function(req, res) {
// Successful authentication, redirect home.
res.redirect('/');
});

app.get("/",function(req,res){
    console.log("REQ USER")
    console.log(req.user)
    res.send("Sucess! user:"+req.user.username);
})

app.listen(3001, function () {
    console.log("Listening...");
});
/////////////////////////////////////////

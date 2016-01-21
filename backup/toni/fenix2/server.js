var express = require("express");
var passport = require("passport");
var OAuth2Strategy = require("passport-oauth2").Strategy;
var fenix = require("./fenix");
var mongoose = require('mongoose');
var configDB = require('./config/database.js');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

app = express();








passport.use(new OAuth2Strategy({
        authorizationURL: 'https://fenix.tecnico.ulisboa.pt/oauth/userdialog',
        tokenURL: 'https://fenix.tecnico.ulisboa.pt/oauth/access_token',
        clientID: "1132965128044570",
        clientSecret: "FJL67JqPbgJrD7bBfdnTUdvFB7SYTwhpfyw09cMtiiytD8BsMs1LWVGTkA2Y4H5RyB0AmdqqL24c4d8Nr8DETw==",
        callbackURL: "http://shelf.n1z.pt:3001/auth/fenix/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log({access_token:accessToken,refresh_token: refreshToken, profile: profile});
        
        fenix.person(accessToken,function(err,res){
          console.log(res);
          return done(null, res.email);
        });
        
    }
));




app.get('/auth/fenix',
  passport.authenticate('oauth2'));

app.get('/auth/fenix/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.listen(3001, function () {
  console.log("Listening...");
});
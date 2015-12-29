
var OAuth2  = require("passport-oauth2").Strategy,
    fenix   = require("./fenix"),
    User    = require("../models/user");

module.exports = function(passport){

    // get username from fenix login
    OAuth2.prototype.userProfile = function(token,done){
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


    // fenix api endpoints
    passport.use(new OAuth2({
            authorizationURL: 'https://fenix.tecnico.ulisboa.pt/oauth/userdialog',
            tokenURL: 'https://fenix.tecnico.ulisboa.pt/oauth/access_token',
            clientID: "1132965128044570",
            clientSecret: "FJL67JqPbgJrD7bBfdnTUdvFB7SYTwhpfyw09cMtiiytD8BsMs1LWVGTkA2Y4H5RyB0AmdqqL24c4d8Nr8DETw==",
            callbackURL: "http://shelf.n1z.pt/auth/fenix/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ 'username' : profile.username }, function(err, user) {

                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                }
                else {
                    
                    console.log({access_token:accessToken,refresh_token: refreshToken, profile: profile});
                    
                    User.create({
                        username : profile.username,
                        accessToken : accessToken,
                        refreshToken : refreshToken
                    }, function(err,user){
                        if (err)
                            return done(err);
                        return done(null, user);
                    })
                }  
            })
        }
    ));

};
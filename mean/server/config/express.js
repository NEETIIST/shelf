
var bodyParser  = require("body-parser"),
    cookieParser= require("cookie-parser");

module.exports = function(app,passport){

    app.use(cookieParser()); 
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(require('express-session')({
        secret: 'dsNjsAzaGZY6NmL3YJGIR9q50UjdHR2jBDqhLfTviz0YQcFDrWYSehtzqGXN',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
};
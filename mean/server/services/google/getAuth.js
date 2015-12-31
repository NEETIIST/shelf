var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var Drive = require("./functions");


var oauth2Client = new OAuth2("447918343020-v6nna41qs6lon9s58sfkruq1hid9j1h8.apps.googleusercontent.com", 
                "30Fm8I1-JPMhI2Yb8x3XSquT", 
                "http://shelf.n1z.pt/auth/google/callback");

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/drive'
];
/*
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

console.log("URL: "+url);
//get code from url and copy to json
*/

var code= '4/9AedYRCji7xIj-aAJsxSApeuWzIV3hb7dube7aqozOI';


oauth2Client.getToken(code, function(err, tokens){
  // Now tokens contains an access_token and an optional refresh_token. Save them.
  if(!err) {
    console.log(tokens);
    //get the tokens to json
    oauth2Client.setCredentials(tokens);
        
  }
});















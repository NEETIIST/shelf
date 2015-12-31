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

var code= '4/_53MVg6zvZ6CD30cTfTXSarfcUozD2roVbSnfdZYsgc';


oauth2Client.getToken(code, function(err, tokens){
  // Now tokens contains an access_token and an optional refresh_token. Save them.
  if(!err) {
    console.log(tokens);
    //get the tokens to json
    oauth2Client.setCredentials(tokens);
    
    //*Drive.folder(oauth2Client,"Arquitectura de redes","Valadas",function(err,argument) {
      
    

  Drive.createFile("cona",oauth2Client,"Valadas",function(err,argument) {
  })
       
  }
});





/****************colocar esta situação no server.js**********************

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({
  access_token: 'ACCESS TOKEN HERE',
  refresh_token: 'REFRESH TOKEN HERE'
});

*****************************************************************************/

/****************refresh token**********************

oauth2Client.refreshAccessToken(function(err, tokens) {
  // your access_token is now refreshed and stored in oauth2Client
  // store these new tokens in a safe place (e.g. database)
});

*****************************************************************************/








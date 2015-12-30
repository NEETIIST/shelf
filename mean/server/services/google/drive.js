var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;



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
*/
//get code from url and copy to json
var code= '4/WrA5Qrx_kr2MO6AsvPNub20YkLAw9Tx7t5-iYoxpM1I';


oauth2Client.getToken(code, function(err, tokens) {
  // Now tokens contains an access_token and an optional refresh_token. Save them.
  if(!err) {
  	console.log(tokens);
  	//get the tokens to json
    oauth2Client.setCredentials(tokens);
    listFiles(oauth2Client);
    createFolder(oauth2Client);
  }
});


//////////functions/////////////////////////////////////////////////
function listFiles(auth) {
  var service = google.drive('v2');
  service.files.list({
    auth: auth,
    maxResults: 10,
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.items;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.title, file.id);
      }
    }
  });
}


function createFolder(auth){
  var drive = google.drive('v2');
  drive.files.insert({
    auth: auth,
    resource: {
        mimeType: 'application/vnd.google-apps.folder',
        title: 'Toino',
        parents: [{"id":'0B-je9j5AlDQSSC1TR19ueThGUFk'}]
    }
},function(err,response){
    if(err){
        console.log('error at gdrive create folder: ' + err);
    }else{
        console.log('create response: ' + response);
    }
});
}








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








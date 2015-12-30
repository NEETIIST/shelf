
// Obtain a media streaming endpoint

require('./auth.js');

var OAuth= require('oauth').OAuth;

oAuth= new OAuth(
  "https://meocloud.pt/oauth/request_token",
  "https://meocloud.pt/oauth/access_token", 
  key, secret, 
  "1.0", "oob", "HMAC-SHA1"
);

oAuth.post(
  "https://publicapi.meocloud.pt/1/Media/meocloud/Matilda.m4a",
  access_token, token_secret,
  {'protocol':'rtsp'},
  function(error, data) {
    if(error) console.log(require('sys').inspect(error))
    else console.log(data)
  }
);

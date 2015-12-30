
// Please check README before running this
// Lists all changes on your Meocloud folder

require('./auth.js');

var OAuth= require('oauth').OAuth;

oAuth= new OAuth(
  "https://meocloud.pt/oauth/request_token",
  "https://meocloud.pt/oauth/access_token", 
  key, secret, 
  "1.0", "oob", "HMAC-SHA1"
);

oAuth.post(
  "https://publicapi.meocloud.pt/1/Delta",
  access_token, token_secret, null,
  function(error, data) {
    if(error) console.log(require('sys').inspect(error))
    else console.log(data)
  }
);

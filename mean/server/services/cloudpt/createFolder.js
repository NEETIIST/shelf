
// Please check README before running this
// Creates a folder on your Meocloud

require('./auth.js');

var argv = require('optimist')
  .usage('Usage: --path=[pathname]')
  .demand(['path'])
  .argv
;

var path = argv.path.trim();
var OAuth= require('oauth').OAuth;

oAuth= new OAuth(
  "https://meocloud.pt/oauth/request_token",
  "https://meocloud.pt/oauth/access_token", 
  key, secret, 
  "1.0", "oob", "HMAC-SHA1"
);

oAuth.post(
  "https://publicapi.meocloud.pt/1/Fileops/CreateFolder",
  access_token, token_secret,
  {'root':'meocloud',
   'path':path},
  function(error, data) {
    if(error) console.log(require('sys').inspect(error))
    else console.log(data)
  }
);


// Please check README before running this
// Lists contents of a folder

require('./auth.js');

var OAuth= require('oauth').OAuth;

oAuth= new OAuth(
	"https://meocloud.pt/oauth/request_token",
	"https://meocloud.pt/oauth/access_token", 
	key, secret, 
	"1.0", "oob", "HMAC-SHA1"
);


module.exports.list = function(path,callback){

	oAuth.get(
		"https://publicapi.meocloud.pt/1/List/meocloud/?file_limit=2",
		access_token, token_secret,
		function(error, data) {
			console.log(data);
			if(error) callback(error,null)
			else callback(null,data)

		}
	);

}
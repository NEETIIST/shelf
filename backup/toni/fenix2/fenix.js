var request = require("request");




module.exports.person = function(token,callback){

	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person?access_token='+token, 
	function (err, res, body) {
		
		callback(err,JSON.parse(body));
  	});


};
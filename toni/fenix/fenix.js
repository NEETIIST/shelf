var request = require("request");




module.exports.person = function(token,callback){
	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person?access_token='+token, 
	function (err, res, body) {
		
		callback(err,JSON.parse(body));
  	
  	});
};



module.exports.courses = function(token,callback){
	//https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person/courses?academicTerm=2013/2014
	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person/coursesn?access_token='+token, 
	function (err, res, body) {
		
		callback(err,JSON.parse(body));
  	
  	});

};
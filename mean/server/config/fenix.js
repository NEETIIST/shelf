var request = require("request");




module.exports.person = function(token,callback){
	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person?access_token='+token, 
	function (err, res, body) {
		
		callback(err,JSON.parse(body));
  	
  	});
};



module.exports.courses = function(token,callback){
	//https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person/courses?academicTerm=2013/2014
	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person/courses?access_token='+token, 
	function (err, res, body) {

		results = JSON.parse(body);
		
		var tmp = results['enrolments'];
		console.log('toni');
		console.log(results);
		var courses = [];
		for(i=0; i<tmp.length; i++){
			courses.push(tmp[i].name);
		}
		
		callback(err,courses);
  	
  	});

};
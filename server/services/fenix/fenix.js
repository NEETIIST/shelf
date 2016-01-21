var request = require("request");




module.exports.person = function(token,callback){
	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person?access_token='+token, 
	function (err, res, body) {
		
		callback(err,JSON.parse(body));
  	
  	});
};



module.exports.courses = function(token,callback){
	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person/courses?access_token='+token, 
	function (err, res, body) {

		results = JSON.parse(body);
		
		var tmp = results['enrolments'];
		var courses = [];
		for(i=0; i<tmp.length; i++){
			courses.push(tmp[i].name);
		}
		
		callback(err,courses);
  	
  	});

};


module.exports.coursesByDegree = function(degree, academicTerm,callback){
	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/degrees/'+degree+'/courses?academicTerm='+academicTerm, 
	function (err, res, body) {

		if(body){
			result = JSON.parse(body);
			if(result){
				callback(err,result);
			}else{
				callback(err,[]);
			}
			
		}else{
			callback(err,[]);
		}
  	
  	});
};

module.exports.teachersByCourse = function(course,cn,callback){
	request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/courses/'+course, 
	function (err, res, body) {

		if(body){
			result = JSON.parse(body);
			if(result){
				callback(err,result.teachers,cn);
			}else{
				callback(err,[],cn);
			}
		}
		else{
			callback(err,[],cn);
		}
  	});
};


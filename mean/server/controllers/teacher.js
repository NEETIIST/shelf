var Document  = require("../models/document");
var Course  = require("../models/course");


module.exports.getDocsTeachers   = function(req,res) {

	console.log("\nGET /api/"+req.params.course+"/docteachers");

  	Document.find({ course: req.params.course, approved: true }, 
    	function (err, results) {
        	teachers = [];
        	for(i=0; i<results.length; i++){
          		teachers.push(results[i].teacher);
          		teachers.unique();
        	}
        	
        	console.log("\tDOCUMENTS TEACHERS json response");
        	
        	res.json(teachers);
      	}
    );
};

module.exports.getCourseTeachers   = function(req,res) {
  	
	console.log("\nGET /api/"+req.params.course+"/teachers");

  	Course.find({ acronym: req.params.course }, 
    	function (err, results) {
        	if(results){
            	if(results.length>0){

            		console.log("\tCOURSE TEACHERS json response");
              		
              		res.json(results[0].teachers);
            	}
       		}
      	}
    );
};
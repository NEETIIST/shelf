var Document  = require("../models/document");
var Course  = require("../models/course");
Array.prototype.unique = function(){ var o = {}, i, l = this.length, r = []; for(i=0; i<l;i+=1) o[this[i]] = this[i]; for(i in o) r.push(o[i]); return r; };


module.exports.getDocsTeachers   = function(req,res) {

	console.log("\nGET /api/"+req.params.course+"/docteachers");

  	Document.find({ course: { $regex : new RegExp('^'+req.params.course+'$', "i") }, approved: true, hide:false }, 
    	function (err, results) {
        	teachers = [];
        	for(i=0; i<results.length; i++){
              if(results[i].teacher){
                if(teachers.indexOf(results[i].teacher)==-1)
                 teachers.push(results[i].teacher);
              } 
          		
          		
        	}
        	
        	console.log("\tDOCUMENTS TEACHERS json response");
        	
        	res.json(teachers);
      	}
    );
};

module.exports.getCourseTeachers   = function(req,res) {
  	
	console.log("\nGET /api/"+req.params.course+"/teachers");

  	Course.find({ acronym: { $regex : new RegExp('^'+req.params.course+'$', "i") } }, 
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
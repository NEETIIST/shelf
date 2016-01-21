var Document  = require("../models/document");
var Course    = require("../models/course");
var Degree    = require("../models/degree");
var fenix     = require("../services/fenix/fenix");
var asyncLoop = require("../config/asyncloop");


module.exports.getCourse = function (req,res) {

	console.log("\nGET /api/courses/"+req.params.course);

  	Course.findOne({acronym: req.params.course}, function(err, result){
  		console.log("\tCOURSE json response");
    	res.json(result);  
  	});
};


module.exports.getUserCourses  = function(req,res) {

	console.log("\nGET /api/user/courses");

  	Course.find({}, 
    	function (err, results) {

      		fenix.courses(req.user.accessToken,function(err,tmp){
          		var courses = [];
          		for(i=0; i<results.length; i++){
            		if(tmp.indexOf(results[i].name) != -1){
              			courses.push(results[i])
            		}
          		}
        		console.log("\tUSER COURSES json response");
        		res.json(courses);

      		});
    	}
  	);
};

module.exports.getCoursesByDegree  = function(req,res){

	console.log("\nGET /api/leti/courses");

    Course.find({}, function (err, courses) {

      	var results = [];

      	asyncLoop(courses.length,function(loop){
        	Degree.find({acronym: req.params.degree.toUpperCase()}, function (err, degrees) {

          		degree=degrees[0];

          		if(degree){
          			if(degree.courses.indexOf(courses[loop.iteration()].acronym) != -1)
            			results.push(courses[loop.iteration()]);
          		}
          		loop.next();
        	});
        },function(){
        	console.log("\tLETI COURSES json response");
        	res.json(results);
        });
    });
};
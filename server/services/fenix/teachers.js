
var fenix	= require("./fenix");
var Degree 	= require("../../models/degree.js");
var Course 	= require("../../models/course.js");
var mongoose =	require("mongoose");

mongoose.connect('mongodb://localhost:27017/shelf');

Array.prototype.unique = function() {    
    var o = {}, i, l = this.length, r = [];    
    for(i=0; i<l;i+=1) o[this[i]] = this[i];    
    for(i in o) r.push(o[i]);    
    return r;
};

function insertTeacher(course,teacher){
	Course.findOneAndUpdate({name:course},
		{$addToSet: {teachers: teacher}},
		{safe: true, upsert: true},
		function(err, model) { }
    );
};

var date = new Date();

Degree.find({}, function (err, results) {	
	for (var d=0; d<results.length; d++){

		degree = results[d];

		for (i = 2006; i<=date.getFullYear(); i++){

			academicTerm = i.toString()+"/"+(i+1).toString();
			
			fenix.coursesByDegree(degree.id,academicTerm,function(err,courses){

				for(var c=0; c<courses.length; c++){

					course = courses[c];

					fenix.teachersByCourse(course.id,course.name,function(err,teachers,course_name){

						for(var t=0; t<teachers.length; t++){

							teacher = teachers[t];

							insertTeacher(course_name,teacher.name);
						}
				
					});
				}

			});
		}
	}
});


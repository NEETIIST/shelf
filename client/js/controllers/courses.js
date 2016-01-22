app.factory('Courses', ['$http', function ($http) {
    var factory = {};
    	factory.courses = [];
    	factory.all_courses = [];
    	factory.full = false;
    	factory.all_full = false;

    factory.getUserCourses = function(callback){
    	if(!factory.full){
    		$http.get("/api/user/courses").then(function(data,status){
	        	factory.courses = data.data;
	        	factory.full = true;
	        	callback(factory.courses);
	    	});
	    }else{
	    	callback(factory.courses);
	    }
    };

    factory.getAllCourses = function(callback){
    	if(!factory.all_full){
    		$http.get("/api/leti/courses").then(function(data,status){
	        	factory.all_courses = data.data;
	        	factory.all_full = true;
	        	callback(factory.all_courses);
	    	});
	    }else{
	    	callback(factory.all_courses);
	    }
    };

    factory.getCourseByAcronym = function(course_id,callback){
    	factory.getAllCourses(function(courses){
    		for(i=0; i<courses.length; i++){
    			if(courses[i].acronym==course_id){
    				callback(courses[i]);
    				return;
    			}
    		}
    		callback(null);
    	});
    };
    return factory;
}]);



app.controller('courses', ['$scope','Courses', 

	function ($scope,Courses) {

		$scope.courses = [];
		Courses.getUserCourses(function(courses){
			$scope.courses = courses;
		});

		$scope.degreeCourses = [];
		Courses.getAllCourses(function(courses){
			$scope.degreeCourses = courses;
		});

	}

]);
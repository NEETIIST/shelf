

app.controller('courses', ['$scope','$resource', 

	function ($scope,$resource) {

		// USER Course
		var Course = $resource('/api/user/courses');
		
		Course.query(function (results) {
			$scope.courses = results;
		});
		$scope.courses = [];


		// ALL Course
		var degreeCourse = $resource('/api/leti/courses');
		
		degreeCourse.query(function (results) {
			$scope.degreeCourses = results;
		});
		$scope.degreeCourses = [];

	}

]);
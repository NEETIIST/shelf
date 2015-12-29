app.controller('courses', ['$scope','$resource', 

	function ($scope,$resource) {

		// Document
		var Course = $resource('/api/leti/courses');
		
		Course.query(function (results) {
			$scope.courses = results;
		});
		$scope.courses = [];

	}

]);
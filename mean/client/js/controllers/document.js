app.controller('document', ['$scope', '$resource','$routeParams', 

	function ($scope, $resource, $routeParams) {

		var Document = $resource('/api/'+$routeParams.course+'/docs');

		$scope.title = $routeParams.course;

		Document.query(function (results) {
			$scope.documents = results;
		});

		$scope.documents = [];
	}

]);
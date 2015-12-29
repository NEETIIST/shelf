app.controller('document', ['$scope', '$resource','$routeParams', 

	function ($scope, $resource, $routeParams) {

		// Title
		$scope.title = $routeParams.course;


		// Document
		var Document = $resource('/api/'+$routeParams.course+'/docs');
		Document.query(function (results) {
			$scope.documents = results;
		});
		$scope.documents = [];


		// Selected
		$scope.selected = {
			teachers : [],
			tags : [],
			types : []
		};



		// Tags
		var Tag = $resource('/api/'+$routeParams.course+'/tags');
		Tag.query(function (results) {
			$scope.tags = results;
		});
		$scope.tags = [];
		$scope.toggleTag = function(tag) {
    		var i = $scope.selected.tags.indexOf(tag);
    		if (i === -1)
        		$scope.selected.tags.push(tag);
    		else
        		$scope.selected.tags.splice(i,1);
		};
		$scope.filterTag = function(doc) {
			if($scope.selected.tags.length==0)
				return true;
			for (var i = 0; i < doc.tags.length; i++) {
    			if($scope.selected.tags.indexOf(doc.tags[i]) != -1)	
    				return true;
			}
        	return false;
    	};


		// Teacher
		var Teacher = $resource('/api/'+$routeParams.course+'/teachers');
		Teacher.query(function (results) {
			$scope.teachers = results;
		});
		$scope.teachers = [];
		$scope.toggleTeacher = function(teacher) {
    		var i = $scope.selected.teachers.indexOf(teacher);
    		if (i === -1)
        		$scope.selected.teachers.push(teacher);
    		else
        		$scope.selected.teachers.splice(i,1);
		};
		$scope.filterTeacher = function(doc) {
			if($scope.selected.teachers.length==0)
				return true;
			for (var i = 0; i < doc.teachers.length; i++) {
    			if($scope.selected.teachers.indexOf(doc.teachers[i]) != -1)	
    				return true;
			}
        	return false;
    	};

    	// Type
		$scope.types = [ "Prática", "Slides" ];
		$scope.toggleType = function(type) {
    		var i = $scope.selected.types.indexOf(type);
    		if (i === -1)
        		$scope.selected.types.push(type);
    		else
        		$scope.selected.types.splice(i,1);
		};
		$scope.filterType = function(doc) {
			if($scope.selected.types.length==0)
				return true;
			if($scope.selected.types.indexOf(doc.type) != -1)	
        		return true;
        	return false;
    	};


    	// Tests
		$scope.test = function(){
			console.log("$scope.selected.teachers");
			console.log($scope.selected);
		};


	}

]);


app.controller('document', ['$scope', '$resource','$routeParams', 

	function ($scope, $resource, $routeParams) {

		var iOS = /iPad|iPhone|iPod/.test(navigator.platform);

		// Title
		$scope.title = $routeParams.course;



		// Course
		var Course = $resource('/api/course/:courseid',{courseid:'@courseid'});

		Course.get({courseid:$routeParams.course}, function(course) {
  			$scope.title = course.name;
		});

		$scope.go = function ( doc ) {
			var url = "/preview/#/"+doc._id;

			if(doc.content[0].local && iOS)
				url = "http://shelf.n1z.pt/content/"+doc.content[0].local;
			
			window.location.href=url;
		};



		// Document
		var Document = $resource('/api/'+$routeParams.course+'/docs');
		Document.query(function (results) {
			$scope.documents = results;
		});
		$scope.documents = [];

		// Terms
		var Term = $resource('/api/'+$routeParams.course+'/terms');
		Term.query(function (results) {
			for(i=1; i<results.length+1; i++){
				$scope.terms.push({id:i,label:results[i-1]});
			}
		});
		$scope.terms = [];

		$scope.filterTerm = function(doc){
			if($scope.selected.terms.length==0)
				return true;

			for(i=0; i<$scope.selected.terms.length; i++){
				if(doc.academicTerm==$scope.terms[$scope.selected.terms[i].id-1].label)
					return true;
			}
        	return false;
		}

		


		// Selected
		$scope.selected = {
			teachers : [],
			tags : [],
			types : [],
			terms : []
		};



		// Tags
		var Tag = $resource('/api/'+$routeParams.course+'/tags');
		Tag.query(function (results) {
			$scope.tags = [];
			for (var i = 0; i < results.length; i++) {
				$scope.tags.push(results[i]);
			};
			console.log($scope.tags);
		});
		$scope.tags = [];
		$scope.toggleTag = function(tag) {
			
			console.log($scope.selected.tags);

    		var i = $scope.selected.tags.indexOf(tag);
    		if (i<0){
    			console.log("por");
        		$scope.selected.tags.push(tag);
    		}
    		else{
    			console.log("tirar");
        		$scope.selected.tags.splice(i,1);
    		}
    		console.log($scope.selected.tags);
		};
		$scope.filterTag = function(doc) {
			
			if($scope.selected.tags.length==0)
				return true;
			for (var i = 0; i < doc.tags.length; i++) {
    			if($scope.selected.tags.indexOf(doc.tags[i].text) != -1)	
    				return true;
			}
        	return false;
    	};


		// Teacher
		var Teacher = $resource('/api/'+$routeParams.course+'/docteachers');
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
			if(!doc.teachers) return false; 
			for (var i = 0; i < doc.teachers.length; i++) {
    			if($scope.selected.teachers.indexOf(doc.teachers[i]) != -1)	
    				return true;
			}
        	return false;
    	};

    	// Type
		var Type = $resource('/api/'+$routeParams.course+'/doctypes');
		Type.query(function (results) {
			$scope.types = results;
		});
		$scope.types = [];

		$scope.toggleType = function(type) {

    		var i = $scope.selected.types.indexOf(type);
    		if (i === -1){
    			
        		$scope.selected.types.push(type);
        	}
    		else{
        		$scope.selected.types.splice(i,1);
        	}
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
			console.log($scope.selected.terms);
		};


	}

]);
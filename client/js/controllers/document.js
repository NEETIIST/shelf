

app.controller('document', ['$scope', '$resource','$routeParams','Courses',

	function ($scope, $resource, $routeParams, Courses) {

		// Title
		$scope.title = $routeParams.course;



		

		Courses.getCourseByAcronym($routeParams.course, function(course) {
  			$scope.title = course.name;
		});



		$scope.go = function ( doc ) {
			var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
			var url = "/preview/#/"+doc._id;

			if(doc.content[0].mime.indexOf("application/pdf")!=-1 && iOS)
				url = "http://shelf.neeti-ist.pt/content/"+doc.content[0].local;
			
			window.location.href=url;
		};



		// Document
		var Document = $resource('/api/'+$routeParams.course+'/docs');
		Document.query(function (results) {
			$scope.documents = results;
			for(i=0; i<$scope.documents.length; i++){
				$scope.documents[i].uploaded = $scope.documents[i].uploaded.substring(0,10);
			}
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
			
		});
		$scope.tags = [];
		$scope.toggleTag = function(tag) {
			
		

    		var i = $scope.selected.tags.indexOf(tag);
    		if (i<0){
    			
        		$scope.selected.tags.push(tag);
    		}
    		else{
    			
        		$scope.selected.tags.splice(i,1);
    		}
    		
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
    		if (i === -1){
    			
        		$scope.selected.teachers.push(teacher);}
    		else{
    			
        		$scope.selected.teachers.splice(i,1);}
		};
		$scope.filterTeacher = function(doc){
			if($scope.selected.teachers.length==0)
				return true;
			if(!doc.teacher) return false;
	
			if($scope.selected.teachers.indexOf(doc.teacher) != -1)
				return true;
			
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
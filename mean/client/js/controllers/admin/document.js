app.controller("editDocument",['$resource','$scope','$http','Documents','$routeParams',function($resource,$scope,$http,Documents,$routeParams){

	var Type = $resource('/api/leti/types');
    Type.query(function (results) {
        $scope.types=results;
    });
    var Type = $resource('/api/leti/types');
    Type.query(function (results) {
        $scope.types=results;
    });
    $scope.types = [];
	var courses;
    var Course = $resource('/api/leti/courses');
    Course.query(function (results) {
        for(var i=0; i<results.length; i++){
            $scope.courses.push(results[i].acronym);
        }
        courses = $scope.courses.map(function(value){
            return value.toUpperCase();
        });
    });
    $scope.courses = [];
	$scope.$watch('doc.course', function() {

        if(!courses)
            return;

        if(courses.indexOf($scope.doc.course.toUpperCase())>-1){
            var Teacher = $resource('/api/'+$scope.doc.course.toUpperCase()+'/teachers');
            Teacher.query(function (results) {
                $scope.teachers=results;
            });
            var Tag = $resource('/api/'+$scope.doc.course.toUpperCase()+'/tags');
            Tag.query(function (results) {
                tags = [];
                for(var i=0; i<results.length; i++){
                    obj = {text: results[i]};
                    tags.push(obj);
                }
                $scope.tags=tags;
            });
        }
    });
    $scope.teachers = [];
    $scope.tags = [];
    $scope.terms = [];
    var date = new Date();
    for (var i = 2006; i<date.getFullYear(); i++){

        $scope.terms.push("1º semester "+i.toString()+"/"+(i+1).toString());
        if (i!=(date.getFullYear()-1) && date.getMonth() >=0  ){
            $scope.terms.push("2º semester "+i.toString()+"/"+(i+1).toString());
        }
        if (i==(date.getFullYear()-1) && date.getMonth() >0  ){
            $scope.terms.push("2º semester "+i.toString()+"/"+(i+1).toString());
        }
    }

    $scope.terms.reverse();

   
    Documents.getDocById($routeParams.docid,function(doc){
        $scope.doc = doc;
    });


    $scope.submit = function(){

    	$http.post("/api/admin/docs",$scope.doc).then(function(data,status){
    		console.log(data);
            window.location.href="#/admin";
    	});

    }

    $scope.terms = [];
    var date = new Date();
    for (var i = 2006; i<date.getFullYear(); i++){

        $scope.terms.push("1º semester "+i.toString()+"/"+(i+1).toString());
        if (i!=(date.getFullYear()-1) && date.getMonth() >=0  ){
            $scope.terms.push("2º semester "+i.toString()+"/"+(i+1).toString());
        }
        if (i==(date.getFullYear()-1) && date.getMonth() >0  ){
            $scope.terms.push("2º semester "+i.toString()+"/"+(i+1).toString());
        }
    }

    $scope.terms.reverse();


}]);
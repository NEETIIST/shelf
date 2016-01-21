app.controller('report', ['$scope','$http',function($scope,$http) {

    $scope.report = {};




$scope.submit = function (data){      
		if (data.bugdetails!='' && data.bugdetails!=null){
	        var report = {
	            text       : data.bugdetails,
	            visible       : true
	        };

	        $http.post("/api/reports",report).then(function(data,status){
	               console.log(report);
	               $scope.report_complete = true;
	        });
	    }

        
}


}]);

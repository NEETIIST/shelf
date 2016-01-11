app.controller('admin', ['$scope','$http',function($scope,$http) {

	$scope.add = {};

	$scope.docs = [];

	$http.get("/api/admin/docs").then(function(data,status){
	               
	               $scope.docs = data.data;
	               $scope.docs.reverse();
	        });

	$scope.reports = [];

	$http.get("/api/admin/reports").then(function(data,status){
	               
	               $scope.reports = data.data;
	               $scope.reports.reverse();
	        });



	$scope.admins = [];

	$http.get("/api/admin/users").then(function(data,status){
		var users = [];

		for(i=0; i<data.data.length; i++){

			if(data.data[i].name){
				fullName = data.data[i].name.split(' ');
	    		name = fullName[0]+" "+fullName[fullName.length - 1];
				users.push({
					username: data.data[i].username,
					name: name,
					admin: data.data[i].admin
				});
			}
		}
	    
	    $scope.admins = users;
	});


	$scope.submitAdmin = function (data,admin){      
		
		if (admin==0){
			var user = {
            	username :  data.username,
            	admin    :  false
        	};
			$scope.admins.splice($scope.admins.indexOf(data),1);

		}else{
			if (data.username==""){
				return;
			}
			var user = {
            	username : $scope.add.username,
            	admin    : true
        	};
        	$scope.admins.push(user);
        	$scope.add.username="";
		}
		
        
        
        $http.post("/api/admin/users",user).then(function(data,status){
            
        });
        
	}
}]);

app.controller("editDocument",['$scope','$http',function($scope,$http){

	$scope.doc = {
		name: "Merda caraho",
		_id: "cona123",
		
	};


}]);

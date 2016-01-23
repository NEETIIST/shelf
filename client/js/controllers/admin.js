app.factory('Documents', ['$http', function ($http) {
    var factory = {};
    	factory.docs = [];
    	factory.full = false;

    factory.getDocs = function(callback){
    	if(!factory.full){
    		$http.get("/api/admin/docs").then(function(data,status){
	        	factory.docs = data.data;
	        	factory.docs.reverse();
	        	factory.full = true;
	        	callback(factory.docs);
	    	});
	    }else{
	    	callback(factory.docs);
	    }
    };

    factory.getDocById = function(doc_id,callback){
    	factory.getDocs(function(docs){
    		for(i=0; i<docs.length; i++){
    			if(docs[i]._id==doc_id){
    				callback(docs[i]);
    				return;
    			}
    		}
    		callback(null);
    	});
    };
    return factory;
}]);


app.factory('Reports', ['$http', function ($http) {
    var factory = {};
    	factory.reports = [];
    	factory.full = false;

    factory.getReports = function(callback){
    	if(!factory.full){
    		$http.get("/api/admin/reports").then(function(data,status){
	        	factory.reports = data.data;
	        	factory.reports.reverse();
	        	factory.full = true;
	        	callback(factory.reports);
	    	});
	    }else{
	    	callback(factory.reports);
	    }
    };

    factory.getReportById = function(doc_id,callback){
    	factory.getReports(function(reports){
    		for(i=0; i<reports.length; i++){
    			if(reports[i]._id==doc_id){
    				callback(reports[i]);
    				return;
    			}
    		}
    		callback(null);
    	});
    };
    return factory;
}]);

app.controller('admin', ['$scope','$http','Documents','Reports',function($scope,$http,Documents,Reports) {

	$scope.add = {};

	$scope.docs = [];

	$scope.reports = [];

	Documents.getDocs(function(docs){
		$scope.docs = docs;
	});

	Reports.getReports(function(reports){
		$scope.reports = reports;
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
			$scope.add.username=$scope.add.username.toLowerCase();
			if(/^\d+$/.test($scope.add.username)){
				$scope.add.username="ist1"+ $scope.add.username;

			}
			console.log($scope.add.username.indexOf("ist1")==-1 && /^\d+$/.test($scope.add.username.substr(4, $scope.add.username.length)));
			if ($scope.add.username.indexOf("ist1")==-1 && /^\d+$/.test($scope.add.username.substr(4, $scope.add.username.length))==false){
				$scope.add.username="";
				return;
			}
		

			
			var user = {
            	username : $scope.add.username,
            	admin    : true
        	};
        	$scope.admins.push(user);
        	$scope.add.username="";
        	console.log(user);
        	
		}
		
        /*
        
        $http.post("/api/admin/users",user).then(function(data,status){
            
        });*/
        
	}

	$scope.deleteReport = function (data){
		     	    
	    $http.post("/api/admin/reports",data).then(function(res,status){
	       $scope.reports.splice($scope.reports.indexOf(data),1);
	      
	    }); 
        
	}

	$scope.updateDoc = function (data,hide){
			 console.log(data._id);
		hideBoolean=false;
		approvedBoolean=false;
		if (hide==1){
			hideBoolean=true;	
        };
        if (hide==0){
        	approvedBoolean=true;
        }

     	Documents.getDocById(data._id,function(doc){
     		doc.approved = approvedBoolean;
	    	doc.hide = hideBoolean; 
		    
			
		    $http.post("/api/admin/docs",doc).then(function(res,status){
		       $scope.docs.splice($scope.docs.indexOf(data),1);  
		    }); 
     	});
        
	}








}]);
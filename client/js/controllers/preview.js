var app = angular.module('preview',['ngSanitize']);

app.controller('preview', function($scope,$http,$location,$sce) {

	$scope.goodBrowsers = (!/Android/.test(navigator.userAgent) && /Chrome|Safari/.test(navigator.userAgent));

	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	};

	$scope.id = $location.url().split("/")[1];


	$scope.select = function(img){
		$scope.content.now = img.src;
		for(i=0; i<$scope.content.images.length; i++){
			$scope.content.images[i].active=false;
		}
		var i = $scope.content.images.indexOf(img);
		$scope.content.images[i].active = true;
		$scope.content.now = img.src;
	}
	$scope.isActive = function(img){
		return $scope.content.images[$scope.content.images.indexOf(img)].active;
	}

	$http.get("http://shelf.neeti-ist.pt/api/docs/"+$scope.id).
		then(function(response) {
			var data = response.data;

			$scope.content = {
				title: 	data.name,
				course: data.course,
				mime: 	response.data.content[0].mime,
				type: 	response.data.content[0].mime //data.filetype
			};	

			if(["image/jpeg","image/png","image/tiff","image/gif"].indexOf($scope.content.type)!=-1){
				$scope.content.type="images";
			}
			else if($scope.content.type=="application/pdf"){

				$scope.content.filename = "https://docs.google.com/gview?embedded=true&url=http://shelf.neeti-ist.pt/content/"+response.data.content[0].local;
				$scope.download_url = "http://shelf.neeti-ist.pt/download/"+response.data.content[0].local;
				if($scope.goodBrowsers)
					$scope.content.filename = "http://shelf.neeti-ist.pt/content/"+response.data.content[0].local;
			}
			else{
				$scope.content.type = "other";
				$scope.download_url = "http://shelf.neeti-ist.pt/download/"+response.data.content[0].local;
			}

			if($scope.content.type=="images"){		
				console.log(response.data.content);
				$scope.content.images = [];
				for(i=0; i<response.data.content.length; i++){
					if(i==0){ $scope.content.now = "http://shelf.neeti-ist.pt/content/"+response.data.content[0].local; }
					$scope.content.images.push({active: (i==0), src: "http://shelf.neeti-ist.pt/content/"+response.data.content[i].local});
				}
				console.log($scope.content.images);
			}

		}, function(response) {
			$scope.error = response.data || "Request failed";
      	});

});
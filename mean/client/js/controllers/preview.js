var app = angular.module('preview',[]);

app.controller('preview', function($scope,$http,$location) {

	$scope.id = $location.url().split("/")[1];

	$http.get("http://shelf.n1z.pt/api/docs/"+$scope.id).
		then(function(response) {
			var data = response.data;

			$scope.content = {
				title: 	data.name,
				course: data.course,
				type: 	"pdf" //data.filetype
			};	

			if($scope.content.type=="pdf")
				$scope.content.filename = "/js/vendor/pdf/web/viewer.html?pdf=/content/"+response.data.content[0].local;

			if($scope.content.type=="images"){
				items = [];
				for(i=0; i<data.content.length; i++){
					items.push({src: data.content[i].local,w: data.content[i].w,h: data.content[i].h});
				}
				var gallery = new PhotoSwipe(document.getElementById("gallery"),PhotoSwipeUI_Default,items,{history: false,focus: false,modal: false, closeOnScroll: false,showAnimationDuration: 0,hideAnimationDuration: 0});
					gallery.init();
			}

		}, function(response) {
			$scope.error = response.data || "Request failed";
      	});

});



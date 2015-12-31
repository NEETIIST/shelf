var app = angular.module('preview', ['ngResource','ngRoute']);




app.config(function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/:id', {
            template: '<iframe ng-src="{{filename}}" width="100%" height="100%" frameborder="0"></iframe>',
            controller: 'previewController'
        });

});


app.controller('previewController', function($scope, $routeParams,$resource,$rootScope) {


	// Document
	var Document = $resource('/api/docs/:docid',{docid:'@docid'});
	Document.get({docid:$routeParams.id}, function(doc) {
			
			$rootScope.title = doc.name;
			$rootScope.$broadcast('titleAdded');
  
			$scope.filename = "http://shelf.n1z.pt/js/vendor/pdf/web/viewer.html?pdf=/content/"+doc.content[0].local;
	});


});


app.controller('routePreview', function($scope, $routeParams,$rootScope) {

	$rootScope.$on('titleAdded', function () {
        $scope.title = $rootScope.title;
    });


});
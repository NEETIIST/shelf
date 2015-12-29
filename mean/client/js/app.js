var app = angular.module('shelf', ['ngResource','ngRoute']);


app.config(function($routeProvider, $locationProvider) {
  	$routeProvider
   		.when('/course/:course', {
    		templateUrl: 'views/document.html',
    		controller: 'document'
  		})
  		.when('/', {
    		templateUrl: 'views/courses.html',
    		controller: 'courses'
  		})
  		.otherwise({ redirectTo: '/'});
});
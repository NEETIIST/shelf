var app = angular.module('shelf', ['ngTagsInput','ngResource','ngRoute','angularjs-dropdown-multiselect','hljs',
  'ui.bootstrap','ngFileUpload']);


app.config(function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/course/:course', {
            templateUrl: 'views/document.html',
            controller: 'document'
        })
        .when('/upload', {
            templateUrl: 'views/upload.html',
            controller: 'upload'
        })
        .when('/report', {
            templateUrl: 'views/report.html',
            controller: 'report'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'admin'
        })
        .when('/', {
            templateUrl: 'views/courses.html',
            controller: 'courses'
        }) 
        
        .otherwise({ redirectTo: '/'});

});




app.controller('navbar',function($scope,$location){
     $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
})




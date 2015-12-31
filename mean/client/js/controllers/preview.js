var app = angular.module('preview', ['ngResource','ngRoute']);


app.config(function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/:id', {
            templateUrl: 'views/preview.html',
            controller: 'document'
        });

});



app.controller('ChapterController', function($scope, $routeParams) {
     $scope.name = "ChapterController";
     $scope.params = $routeParams;
 })





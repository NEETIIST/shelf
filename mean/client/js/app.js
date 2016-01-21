var app = angular.module('shelf', ['ngTagsInput','ngResource','ngRoute','angularjs-dropdown-multiselect','ngFileUpload']);

function isAdmin($location,User){
    User.getInfo().then(function(res){
        if(!res.data.admin)
            $location.path('/');
    });
};


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
            controller: 'admin',
            resolve: { mess : function($location,User){ isAdmin($location,User); } }
        })
        .when('/admin/docs/:docid', {
            templateUrl: 'views/admin/document.html',
            controller: 'editDocument',
            resolve: { mess : function($location,User){ isAdmin($location,User); } }
        })
        .when('/admin/reports/:reportid', {
            templateUrl: 'views/admin/report.html',
            controller: 'viewBugs',
            resolve: { mess : function($location,User){ isAdmin($location,User); } }
        })
        .when('/', {
            templateUrl: 'views/courses.html',
            controller: 'courses'
        }) 
        
        .otherwise({ redirectTo: '/'});

});

app.factory('User', function($http){
    return {
        getInfo : function(){
            var test = $http.get('/api/user').success(function(res){
                return res;
            });
            return test;
        }
    }
});




app.controller('navbar',['$scope','$location','User',function($scope,$location,$user){
     $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    $user.getInfo().then(function(res){
        $scope.user = res.data;
    });

}]);


$(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});



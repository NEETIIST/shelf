var app = angular.module('shelf', ['ngTagsInput','ngResource','ngRoute','angularjs-dropdown-multiselect','ngFileUpload']);

function adminButton($location,User){
    User.isAdmin(function(admin){
        if(!admin)
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
            resolve: { mess : function($location,User){ adminButton($location,User); } }
        })
        .when('/admin/docs/:docid', {
            templateUrl: 'views/admin/document.html',
            controller: 'editDocument',
            resolve: { mess : function($location,User){ adminButton($location,User); } }
        })
        .when('/admin/reports/:reportid', {
            templateUrl: 'views/admin/report.html',
            controller: 'viewBugs',
            resolve: { mess : function($location,User){ adminButton($location,User); } }
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

app.factory('User', ['$http', function ($http) {
    var factory = {};
        factory.user = [];
        factory.full = false;

    factory.getUser = function(callback){
        if(!factory.full){
            $http.get('/api/user').then(function(data,status){
                factory.user = data.data;
                factory.full = true;
                callback(factory.user);
            });
        }else{
            callback(factory.user);
        }
    };

    factory.isAdmin = function(callback){
        factory.getUser(function(user){
            if(user.admin)
                callback(user.admin)
            else
                callback(false)
        });
    };
    return factory;
}]);




app.controller('navbar',['$scope','$location','User',function($scope,$location,$user){
     $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    $user.getUser(function(user){
        $scope.user=user;
    });

}]);


$(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});



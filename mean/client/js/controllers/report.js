app.controller('report', ['$scope',function($scope) {

    $scope.report = {};




$scope.submit = function (data){      

        var report = {
            bugdetails       : data.bugdetails
        };

        console.log(report);
}


}]);

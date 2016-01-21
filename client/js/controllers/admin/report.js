app.controller("viewBugs",['$scope','Reports','$routeParams',function($scope,Reports,$routeParams){


	Reports.getReportById($routeParams.reportid,function(report){
        $scope.report = report;
    });




}]);
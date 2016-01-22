app.controller("viewBugs",['$scope','Reports','$routeParams',function($scope,Reports,$routeParams){


	Reports.getReportById($routeParams.reportid,function(report){
        $scope.report = report;

        report.reported = report.reported.substring(0,10)+" às "+report.reported.substring(11,19);
    });




}]);
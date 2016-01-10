app.controller('upload', ['$scope','Upload', '$timeout','$resource',function($scope, Upload, $timeout, $resource) {

    $scope.upload_incomplete=true;

    var Document = $resource('/api/user/docs');
    Document.query(function (results) {
        $scope.uploaded = results;
    });
    $scope.uploaded = [];




    var Course = $resource('/api/leti/courses');
    Course.query(function (results) {
        for(var i=0; i<results.length; i++){
            $scope.courses.push(results[i].acronym);
        }
    });
    $scope.courses = [];

    var Type = $resource('/api/leti/types');
    Type.query(function (results) {
        $scope.types=results;
    });
    $scope.types = [];


    $scope.doc=[];
    $scope.doc.course="";

    $scope.$watch('doc.course', function() {
        if($scope.doc.course!=""){
            var Teacher = $resource('/api/'+$scope.doc.course+'/teachers');
            Teacher.query(function (results) {
                $scope.teachers=results;
            });
            var Tag = $resource('/api/'+$scope.doc.course+'/tags');
            Tag.query(function (results) {
                tags = [];
                for(var i=0; i<results.length; i++){
                    obj = {text: results[i]};
                    tags.push(obj);
                }
                $scope.tags=tags;
            });
        }
    });
    $scope.teachers = [];
    $scope.tags = [];


    $scope.uploadFiles = function(files, errFiles) {
        if(!files){ return; }
        

        $scope.files = $scope.files.concat(files);
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/api/upload',
                data: {file: file, session: $scope.session}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        });
    }

    $scope.showAlert = function(){

        $scope.alert = true;
        $timeout(function() { $scope.alert = false; }, 3000);
    }

    $scope.alert = false;
    $scope.uploadComplete = false;


    $scope.submit = function (data){

        for(var i=0; i<$scope.files.length; i++){
            if($scope.files[0].progress!==100){
                return;
            }
        }

        course = data.course;
        var Document = $resource('/api/'+course+'/docs');

        var doc = new Document(); 

        var tags = [];
        for(var i=0; i<data.tags.length; i++){
            tags.push(data.tags[i].text);
        }

        var result = {
            name            : data.name,
            academicTerm    : data.academicTerm,
            tags            : tags,
            teacher         : data.teacher,
            course          : data.course,
            type            : data.type,
            session         : $scope.session
        };

        Document.save(result,function(){
            $scope.uploadComplete = true;
        }); 

    };

    $scope.files = [];
    var upload = $resource('/api/upload');
    upload.query(function (res) {
        console.log("session: "+res[0].session);
        $scope.session = res[0].session;
    });


}]);
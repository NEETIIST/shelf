app.controller('upload', ['$scope','Upload', '$timeout','$resource',function($scope, Upload, $timeout, $resource) {

    $scope.courses = [
        "Arquitecturas de Redes",
        "Gestão"
    ];

    $scope.teachers = [
        "João Pedro Pereira Boavida",
        "Júlio Paisana"
    ];

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

        angular.forEach($scope.files, function(file) {
            if(file.progress==100){

                course = data.course;
                var Document = $resource('/api/'+course+'/docs');

                var doc = new Document();  

                var result = {
                    name            : data.name,
                    academicTerm    : data.academicTerm,
                    tags            : data.tags,
                    teacher         : data.teacher,
                    course          : data.course,
                    session         : $scope.session
                };  

                console.log(result); 

                Document.save(result,function(){
                    $scope.uploadComplete = true;
                }); 
            }
        });

    };

    $scope.files = [];
    var upload = $resource('/api/upload');
    upload.query(function (res) {
        console.log("session: "+res[0].session);
        $scope.session = res[0].session;
    });


}]);
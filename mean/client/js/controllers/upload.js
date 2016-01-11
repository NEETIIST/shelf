app.controller('upload', ['$scope','Upload', '$timeout','$resource','$route',function($scope, Upload, $timeout, $resource,$route) {

    $scope.upload_incomplete=true;

    $scope.new_upload = function(){
        $route.reload();
    }

    var Document = $resource('/api/user/docs');
    Document.query(function (results) {
        $scope.uploaded = results;
         $scope.uploaded.reverse();
    });


    $scope.uploaded = [];
    $scope.terms = [];
    var date = new Date();
    for (var i = 2006; i<date.getFullYear(); i++){

        $scope.terms.push("1º semester "+i.toString()+"/"+(i+1).toString());
        if (i!=(date.getFullYear()-1) && date.getMonth() >=0  ){
            $scope.terms.push("2º semester "+i.toString()+"/"+(i+1).toString());
        }
        if (i==(date.getFullYear()-1) && date.getMonth() >0  ){
            $scope.terms.push("2º semester "+i.toString()+"/"+(i+1).toString());
        }
    }

    $scope.terms.reverse();


    
    

    var Course = $resource('/api/leti/courses');
    Course.query(function (results) {
        for(var i=0; i<results.length; i++){
            $scope.courses.push(results[i].acronym.toUpperCase());
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

        if($scope.courses.indexOf($scope.doc.course.toUpperCase())>-1){
            var Teacher = $resource('/api/'+$scope.doc.course.toUpperCase()+'/teachers');
            Teacher.query(function (results) {
                $scope.teachers=results;
            });
            var Tag = $resource('/api/'+$scope.doc.course.toUpperCase()+'/tags');
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

    var num_pdf = false;
    $scope.uploadFiles = function(files, errFiles) {
        if(!files){ return; }
        
        if(num_pdf){
        	$scope.many_pdfs=true; $scope.upload_incomplete=false;
            $timeout(function() {  $scope.many_pdfs=false; $scope.upload_incomplete=true; }, 4000);
        	return;
        }

        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {

        	if(num_pdf){
                $scope.many_pdfs=true; $scope.upload_incomplete=false;
                $timeout(function() {  $scope.many_pdfs=false; $scope.upload_incomplete=true; }, 4000);
                return;
            }
        	
            if (file.type=="application/pdf"){

                if($scope.files.length>0){
                    $scope.many_pdfs=true; $scope.upload_incomplete=false;
                    $timeout(function() {  $scope.many_pdfs=false; $scope.upload_incomplete=true; }, 4000);
                    return;
                }
                num_pdf = true;
            }

            $scope.files.push(file);

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
      
        
        if ($scope.files.length==0){
            $scope.upload_incomplete=false;
            $scope.no_files=true;
            $timeout(function() {  $scope.no_files=false; $scope.upload_incomplete=true; }, 4000);
            return
        }
        for(var i=0; i<$scope.files.length; i++){
            if($scope.files[i].progress!==100){
            
                return;
            }
        }
        
        if(data.name==null ||data.name=='' || data.type==null ||data.type=='' || data.tags==null ||data.tags=='' || data.course==null ||data.course=='' ){
            $scope.upload_incomplete=false;
            $scope.empty_fields=true;
            $timeout(function() {  $scope.empty_fields=false; $scope.upload_incomplete=true; }, 4000);
            return;
        }
        if ($scope.courses.indexOf(data.course.toUpperCase())==-1){
            $scope.upload_incomplete=false;
            $scope.no_course=true;
            $timeout(function() {  $scope.no_course=false; $scope.upload_incomplete=true; }, 4000);
            return
        }
        if (data.teacher!=null && data.teacher!='' && $scope.teachers.indexOf(data.teacher)==-1){
            $scope.upload_incomplete=false;
            $scope.no_teacher=true;
            $timeout(function() {  $scope.no_teacher=false; $scope.upload_incomplete=true; }, 4000);
            return
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
            course          : data.course.toUpperCase(),
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
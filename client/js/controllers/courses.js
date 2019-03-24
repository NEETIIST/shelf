app.factory('Courses', ['$http', function ($http) {
    var factory = {};
        factory.courses = [];
        factory.all_courses = [];
        factory.full = false;
        factory.all_full = false;

    factory.getUserCourses = function(callback){
        if(!factory.full){
            $http.get("/api/user/courses").then(function(data,status){
                factory.courses = data.data;
                factory.full = true;
                callback(factory.courses);
            });
        }else{
            callback(factory.courses);
        }
    };

    /*
    factory.getAllCourses = function(callback){
        if(!factory.all_full){
            $http.get("/api/leti/courses").then(function(data,status){
                factory.all_courses = data.data;
                factory.all_full = true;
                callback(factory.all_courses);
            });
        }else{
            callback(factory.all_courses);
        }
    };
    */

    factory.getLetiCourses = function(callback){
        if(!factory.all_full){
            $http.get("/api/leti/courses").then(function(data,status){
                console.log("AP# Call");
                factory.all_courses = data.data;
                factory.all_full = true;
                callback(factory.all_courses);
            });
        }else{
            callback(factory.all_courses);
        }
    };

    factory.getMetiCourses = function(callback){
        if(!factory.all_full){
            $http.get("/api/meti/courses").then(function(data,status){
                console.log("API Call");
                factory.all_courses = data.data;
                factory.all_full = true;
                callback(factory.all_courses);
            });
        }else{
            callback(factory.all_courses);
        }
    };

    factory.getCourseByAcronym = function(course_id,callback){
        factory.getLetiCourses(function(courses){
            for(i=0; i<courses.length; i++){
                if(courses[i].acronym==course_id){
                    callback(courses[i]);
                    return;
                }
            }
            //callback(null);
        });
        
        factory.getMetiCourses(function(courses){
            for(i=0; i<courses.length; i++){
                if(courses[i].acronym==course_id){
                    callback(courses[i]);
                    return;
                }
            }
            callback(null);
        });
        /*
        factory.getAllCourses(function(courses){
            for(i=0; i<courses.length; i++){
                if(courses[i].acronym==course_id){
                    callback(courses[i]);
                    return;
                }
            }
            callback(null);
        });
        */
    };
    return factory;
}]);



app.controller('courses', ['$scope','Courses', 

    function ($scope,Courses) {

        $scope.degree = 'leti';

        $scope.courses = [];
        Courses.getUserCourses(function(courses){
            $scope.courses = courses;
        });

        //$scope.degree = 'leti';
        $scope.changeDegree = function(degree){
            $scope.degree = degree;
        }

        $scope.letiCourses = [];
        Courses.getLetiCourses(function(courses){
            $scope.letiCourses = courses;
        });
        
        $scope.metiCourses = [];
        Courses.getMetiCourses(function(courses){
            $scope.metiCourses = courses;
        }); 

        $scope.showDegree = function(degree){
            return $scope.degree == degree;
        }

        $scope.showLeti = function(other){
            return (other && ($scope.degree == 'leti'));
        }   

        $scope.showMeti = function(other){
            return (other && ($scope.degree == 'meti'));
        }       

    }

]);

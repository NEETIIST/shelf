
var Degree    = require("./models/degree");
var Course    = require("./models/course");
var Document  = require("./models/document");

var fenix = require("./services/fenix/fenix");


Array.prototype.unique = function() {    
    var o = {}, i, l = this.length, r = [];    
    for(i=0; i<l;i+=1) o[this[i]] = this[i];    
    for(i in o) r.push(o[i]);    
    return r;
};

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}


module.exports.degrees  = function(req,res) {
  Degree.find({ }, 
    function (err, results) {
        res.json(results);
      }
    );
};

module.exports.courses  = function(req,res) {

  Course.find({}, 
    function (err, results) {

      fenix.courses(req.user.accessToken,function(err,tmp){
          var courses = [];
          for(i=0; i<results.length; i++){
            if(tmp.indexOf(results[i].name) != -1){
              courses.push(results[i])
            }
          }
        res.json(courses);

      });
    }
  );
};


module.exports.degreeTypes  = function(req,res){

    Document.find({approved: true }, 
    function (err, results) {
        var rtypes = [];
        for(i=0; i<results.length; i++){
          if(results[i].type!=undefined)
            rtypes.push(results[i].type)
        }
        rtypes.unique();
        res.json(rtypes);
      }
    );
};

module.exports.degreeCourses  = function(req,res){

    Course.find({}, function (err, courses) {

      var results = [];

      asyncLoop(courses.length,function(loop){
        Degree.find({acronym: req.params.degree.toUpperCase()}, function (err, degrees) {

          degree=degrees[0];

          if(degree){
          

          if(degree.courses.indexOf(courses[loop.iteration()].acronym) != -1){
            results.push(courses[loop.iteration()]);
          }
          }
          loop.next();
        });
        
          
        },function(){
          res.json(results);
        });
      });


};

module.exports.course = function (req,res) {
  Course.findOne({acronym: req.params.course}, function(err, result){
    res.json(result);  
  });
}

module.exports.docs   = function(req,res) {
  Document.find({ course: req.params.course, approved: true }, 
    function (err, results) {
        res.json(results);
      }
    );
};

module.exports.doc   = function(req,res) {
  Document.findById(req.params.docid, 
    function (err, result) {
        res.json(result);
      }
    );
};

module.exports.userDocs   = function(req,res) {
  Document.find({ uploader: req.user.username }, 
    function (err, results) {
        res.json(results);
      }
    );
};

module.exports.doc_teachers   = function(req,res) {
  Document.find({ course: req.params.course, approved: true }, 
    function (err, results) {
        teachers = [];
        for(i=0; i<results.length; i++){
          teachers.push(results[i].teacher);
          teachers.unique();
        }
        
        res.json(teachers);
      }
    );
};

module.exports.teachers   = function(req,res) {
  Course.find({ acronym: req.params.course }, 
    function (err, results) {
        if(results){
            if(results.length>0){
              res.json(results[0].teachers);
            }
        }
      }
    );
};

module.exports.tags   = function(req,res) {
  Document.find({ course: req.params.course, approved: true }, 
    function (err, results) {
        tags = [];
        for(i=0; i<results.length; i++){
          tags = tags.concat(results[i].tags).unique();
        }
        res.json(tags);
      }
    );
};

module.exports.types   = function(req,res) {
  Document.find({ course: req.params.course, approved: true }, 
    function (err, results) {
        types = [];
        for(i=0; i<results.length; i++){
          if(results[i].type) types.push(results[i].type)
        }
        types.unique();
        console.log(types);
        res.json(types);
      }
    );
};

module.exports.academicTerms   = function(req,res) {
  Document.find({ course: req.params.course, approved: true }, 
    function (err, results) {
        terms = [];
        for(i=0; i<results.length; i++){
          if(results[i].academicTerm) terms.push(results[i].academicTerm)
        }
        terms.unique();
        res.json(terms);
      }
    );
};


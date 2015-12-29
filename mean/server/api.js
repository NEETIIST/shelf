
var Degree		= require("./models/degree");
var Course		= require("./models/course");
var Document	= require("./models/document");


Array.prototype.unique = function() {    
    var o = {}, i, l = this.length, r = [];    
    for(i=0; i<l;i+=1) o[this[i]] = this[i];    
    for(i in o) r.push(o[i]);    
    return r;
};


module.exports.degrees 	= function(req,res) {
	Degree.find({ }, 
		function (err, results) {
    		res.json(results);
  		}
  	);
};

module.exports.courses	= function(req,res) {

	Course.find({ degree: req.params.degree }, 
		function (err, results) {
    		res.json(results);
  		}
  	);
};

module.exports.docs		= function(req,res) {
	Document.find({ course: req.params.course, aproved: true }, 
		function (err, results) {
    		res.json(results);
  		}
  	);
};

module.exports.teachers   = function(req,res) {
  Document.find({ course: req.params.course, aproved: true }, 
    function (err, results) {
        teachers = [];
        for(i=0; i<results.length; i++){
          teachers = teachers.concat(results[i].teachers).unique();
        }
        res.json(teachers);
      }
    );
};

module.exports.tags   = function(req,res) {
  Document.find({ course: req.params.course, aproved: true }, 
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
  Document.find({ course: req.params.course, aproved: true }, 
    function (err, results) {
        types = [];
        for(i=0; i<results.length; i++){
          if(results[i].type) types.push(results[i].type)
        }
        types.unique();
        res.json(types);
      }
    );
};


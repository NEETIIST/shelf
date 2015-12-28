
var Degree		= require("./models/degree");
var Course		= require("./models/course");
var Document	= require("./models/document");


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
	Document.find({ course: req.params.course }, 
		function (err, results) {
    		res.json(results);
  		}
  	);
};


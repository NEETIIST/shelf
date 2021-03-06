var Document  = require("../models/document");
var Degree  = require("../models/degree");


module.exports.getTerms   = function(req,res) {

	console.log("\nGET /api/"+req.params.course+"/terms");

  	Document.find({ course: req.params.course, approved: true, hide:false }, 
    	function (err, results) {
        	terms = [];
        	for(i=0; i<results.length; i++){
          		if(results[i].academicTerm){
                if(terms.indexOf(results[i].academicTerm)==-1)
                  terms.push(results[i].academicTerm)
              } 

        	}
        
          

        	console.log("\tCOURSE TERMS json response");


        	res.json(terms);
      	}
    );
};


module.exports.getDegrees  = function(req,res) {

	console.log("\nGET /api/degrees");

  	Degree.find({ }, 
    	function (err, results) {
    		console.log("\tDREGREES json response");
        	res.json(results);
      	}
    );
};
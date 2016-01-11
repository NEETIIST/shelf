var Report  = require("../models/report");
var Upload  = require("../models/upload");


module.exports.createReport = function(req,res){

	console.log("\nPOST /api/reports");
	
	data = req.body;

	var report = new Report({
		username: 		req.user.username,
		text: 			data.text,
		visible:  	 	true
			
	});

	console.log("\tReport username: "+req.user.username);

	report.save(function(err,data){
		if(!err){
			console.log("\tJSON saved");
			res.json(data);
		}
			
	});
	
};



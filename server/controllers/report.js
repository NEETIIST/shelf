var Report  = require("../models/report");
var Upload  = require("../models/upload");


module.exports.createReport = function(req,res){

	console.log("\nPOST /api/reports");
	
	data = req.body;

	if(data.text.length>2000){
		res.send({success:false});
	}

	var report = new Report({
		username: 		req.user.username,
		name: 		req.user.name,
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



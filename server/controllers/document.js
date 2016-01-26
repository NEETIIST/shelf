var Document  = require("../models/document");
var Upload  = require("../models/upload");
var User  = require("../models/user");


module.exports.createDoc = function(req,res){

	console.log("\nPOST /api/"+req.params.course+"/docs");
	
	Upload.findOne({session: req.body.session},function(err,obj){

		console.log("\tUPLOAD findOne session: "+req.body.session);

		data = req.body;

		var content = [];
		for(var i=0; i<obj.files.length; i++){

			console.log("\t\tFILE: "+obj.files[i]);

			content.push({
				local : obj.files[i].filename , mime: obj.files[i].mime
			});
		}
		
		console.log("\ttags: "+data.tags);
		User.findOne({username:req.user.username},function(err,user){
      		var document = new Document({
				name: 			data.name,
				uploader: 		req.user.username,
				type: 			data.type,
				teacher: 		data.teacher,
				course: 		data.course,
				academicTerm: 	data.academicTerm,
				tags: 			data.tags,
				approved: 		user.admin,
				hide: 			false,
				content: 		content
			});

			console.log("\tDOCUMENT: "+data.name);

			document.save(function(err,data){
				if(!err){
					console.log("\tJSON saved");
					res.json(data);
				}
				
			});
    	});
	});
};


module.exports.getDocs = function(req,res){

	console.log("\nGET /api/"+req.params.course+"/docs");

	Document.find({ course: { $regex : new RegExp('^'+req.params.course+'$', "i") }, approved: true , hide: false}, 
    	function (err, results) {
    		console.log("\tDOCUMENTS json response");
        	res.json(results);
      	}
    );
};


module.exports.getUserDocs   = function(req,res) {
  	
  	console.log("\nGET /api/user/docs");

  	Document.find({ uploader: req.user.username }, 
    	function (err, results) {
    		console.log("\tDOCUMENTS json response");
       	 	res.json(results);
      	}
    );
};


module.exports.getDocById   = function(req,res) {

	console.log("\nGET /api/docs/"+req.params.docid);
  	
  	Document.findById(req.params.docid, 
    	function (err, result) {
    		console.log("\tDOCUMENT json response");
        	res.json(result);
      	}
    );
};
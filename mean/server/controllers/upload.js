

var multiparty 	= require('connect-multiparty'),
	fs 			= require('fs'),
	path 		= require('path'),
	Upload		= require("../models/upload"),
	Document	= require("../models/document");
	multipartyMiddleware = multiparty();

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
    	return next();
    
	res.redirect('/');
};

function makeid(l){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < l; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};

module.exports = function(app) {


	app.get('/api/upload',isLoggedIn,function(req,res){

		var session = makeid(20);

		var upload = new Upload({
			session		: 	session,
			username	: 	req.user.username,
			complete	: 	false,
			files		: 	[]
		});

		upload.save(function(err){
			if(!err)
				res.json([{session: session}]);
			else
				res.json(null);
		});

	});

	app.post('/api/upload', isLoggedIn, multipartyMiddleware, function(req, res) {

		if(req.body.session){

			var file = req.files.file;
	  		var filename = file.path.replace(/^.*[\\\/]/, '')
			fs.rename(file.path, path.join(__dirname, '../../content', filename), function(){

				Upload.findOneAndUpdate(
					{ session: req.body.session },
					{ $addToSet: {files: filename} },
					{safe: true, upsert: true},
					function(err, model) { 
						
						res.json(model);

					}
				);
			});
		}
		else res.status(403).send('Upload error!');
		
	});

	app.post('/api/:course/docs', isLoggedIn, function(req,res){

		console.log("/api/:course/docs");

		
		Upload.findOne({session: req.body.session},function(err,obj){

			console.log("Upload.findOne");

			data = req.body;

			var content = [];
			for(var i=0; i<obj.files.length; i++){

				console.log("\t\tFile: "+obj.files[i]);

				content.push({
					local : obj.files[i]
				});
			}

			var document = new Document({
				name: 			data.name,
				uploader: 		req.user.username,
				type: 			data.type,
				teacher: 		data.teacher,
				course: 		data.course,
				academicTerm: 	data.academicTerm,
				tags: 			data.tags,
				approved: 		false,
				content: 		content
			});

			console.log("doc.save");

			document.save(function(err,data){
				if(!err){
					console.log("res.json(data)");
					res.json(data);
				}
				
			});

		});
		

	})
};
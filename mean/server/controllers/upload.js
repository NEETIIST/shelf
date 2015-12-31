

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

		console.log(req.body);

		if(req.body.session){

			Upload.findOne({ session: req.body.session },function (err, obj) {

      			if(obj.session){

	      			var file = req.files.file;
	  				var filename = file.path.replace(/^.*[\\\/]/, '')
					fs.rename(file.path, path.join(__dirname, '../../content', filename), function(){

						console.log("Uploaded file: "+filename);

						result = {
							file 		: filename,
							size 		: file.size,
							original 	: file.originalFilename,
							type 		: file.type,
						};

						obj.files.push(filename);
						obj.save();
						res.json(result);

					});
				} else res.status(403).send('Upload error!');

      		});
		}
		else res.status(403).send('Upload error!');
		
	});

	app.post('/api/:course/docs', isLoggedIn, function(req,res){

		
		Upload.findOne({session: req.body.session},function(err,obj){

			var content = [];
			for(file in obj.files){
				content.push({
					local : file
				});
			}

			var document = new Document({
				name: 			req.body.name,
				uploader: 		req.user.username,
				type: 			req.body.type,
				teachers: 		req.body.teachers,
				course: 		req.body.course,
				academicTerm: 	req.body.academicTerm,
				tags: 			req.body.tags,
				approved: 		false,
				content: 		content
			});

			document.save(function(err,data){
				if(!err)
					res.json(data);
				
			});

		});
		

	})
};
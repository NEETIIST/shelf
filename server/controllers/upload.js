
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

		error=false;

		if(req.body.session){

			var file = req.files.file;
			console.log(file.type);
	  		var filename = file.path.replace(/^.*[\\\/]/, '');

			Upload.findOne({ session: req.body.session }, 
    			function (err, upload) {
    				if(upload.files.length>0 && file.type=="application/pdf"){
    					error=true;
    				}
      			}
      		);

			if(error) return;

			fs.rename(file.path, path.join(__dirname, '../../content', filename), function(){

				Upload.findOneAndUpdate(
					{ session: req.body.session },
					{ $addToSet: {files: {filename :filename ,mime: file.type } }},
					{safe: true, upsert: true},
					function(err, model) { 
						
						res.json(model);

					}
				);
			});
		}
		else res.status(403).send('Upload error!');
		
	});
};
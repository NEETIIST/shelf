/* Shelf */

// require dependencies
var express 	= require("express"),
	mongoose	= require("mongoose"),
	bodyParser	= require("body-parser"),
	passport    = require("passport");


var	app = express();

require("./server/config/passport")(passport);
require("./server/config/express")(app,passport);

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
    	return next();
    
	res.redirect('/');
}


// connect to database
mongoose.connect('mongodb://localhost:27017/shelf');


// routes
require("./server/routes.js")(app,passport);

// public folders
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/views', express.static(__dirname + '/client/views'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/images', express.static(__dirname + '/client/images'));
app.use('/content', express.static(__dirname + '/content'));


// REST API
var rest = require("./server/api");
app.get('/api/degrees', isLoggedIn, rest.degrees);
app.get('/api/user/courses', isLoggedIn, rest.courses);
app.get('/api/user/docs', isLoggedIn, rest.userDocs);
app.get('/api/:degree/courses', isLoggedIn, rest.degreeCourses);
app.get('/api/:degree/types', isLoggedIn, rest.degreeTypes);
app.get('/api/:course/docs', isLoggedIn, rest.docs);
app.get('/api/:course/docteachers', isLoggedIn, rest.doc_teachers);
app.get('/api/:course/teachers', isLoggedIn, rest.teachers);
app.get('/api/:course/tags', isLoggedIn, rest.tags);
app.get('/api/:course/types', isLoggedIn, rest.types);
app.get('/api/:course/terms', isLoggedIn, rest.academicTerms);
require('./server/controllers/upload')(app);



app.use(function(req,res){
	res.redirect('/');
});

// start server
app.listen(80, function() {
	console.log('Server listening...');
});
/* Shelf */

// require dependencies
var express 	= require("express"),
	mongoose	= require("mongoose"),
	bodyParser	= require("body-parser");

// configure app with express
var	app = express();
	app.use(bodyParser());

// connect to database
mongoose.connect('mongodb://localhost:27017/shelf');



// views
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/client/index.html');
});

// public folders
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/views', express.static(__dirname + '/client/views'));



// REST API
var rest = require("./server/api");
app.get('/api/degrees', rest.degrees);
app.get('/api/:degree/courses', rest.courses);
app.get('/api/:course/docs', rest.docs);



// start server
app.listen(3000, function() {
	console.log('Server listening...');
});
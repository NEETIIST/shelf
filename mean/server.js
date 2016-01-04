/* Shelf */

// require dependencies
var express 	= require("express"),
	mongoose	= require("mongoose"),
	bodyParser	= require("body-parser"),
	passport    = require("passport");

Array.prototype.unique = function(){ var o = {}, i, l = this.length, r = []; for(i=0; i<l;i+=1) o[this[i]] = this[i]; for(i in o) r.push(o[i]); return r; };

var	app = express();


// public folders
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/views', express.static(__dirname + '/client/views'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/images', express.static(__dirname + '/client/images'));
app.use('/content', express.static(__dirname + '/content'));



require("./server/config/passport")(passport);
require("./server/config/express")(app,passport);


// connect to database
mongoose.connect('mongodb://localhost:27017/shelf');


// routes
require("./server/routes.js")(app,passport);


// start server
app.listen(80, function() {
	console.log('Server listening...');
});
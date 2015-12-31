var mongoose = require('mongoose');

module.exports = mongoose.model('Upload', {
	session		: 	{type: String, unique: true},
	username	: 	String,
	complete	: 	Boolean,
	files		: 	[String]	
});
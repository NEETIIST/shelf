var mongoose = require('mongoose');

module.exports = mongoose.model('Upload', {
	session		: 	{type: String, unique: true},
	date 		: 	{type: Date, default: Date.now},
	username	: 	String,
	complete	: 	Boolean,
	files		: 	[{filename:String , mime: String}]
});
var mongoose = require('mongoose');

module.exports = mongoose.model('Document', {
	name: 			String,
	uploader: 		String,
	teachers: 		[String],
	course: 		String,
	uploaded: 		{ type: Date, default: Date.now },
	academicTerm: 	String,
	tags: 			[String],
	aproved: 		Boolean
});
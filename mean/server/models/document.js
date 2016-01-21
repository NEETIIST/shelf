var mongoose = require('mongoose');

module.exports = mongoose.model('Document', {
	name: 			String,
	uploader: 		String,
	type: 			String,
	teacher: 		String,
	course: 		String,
	uploaded: 		{ type: Date, default: Date.now },
	academicTerm: 	String,
	tags: 			[{text:String}],
	approved: 		{type: Boolean, default: false},
	hide: 			Boolean,
	content: 		[{
		mime:       String,
		meocloud: 	String,
		drive: 		String, 
		dropbox: 	String,
		local: 		String
	}]
});
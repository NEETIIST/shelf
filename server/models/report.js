var mongoose = require('mongoose');

module.exports = mongoose.model('Report', {
	username: 		String,
	name:   		String,
	text: 	        String,
	visible:        Boolean,
	reported: 		{ type: Date, default: Date.now },
});
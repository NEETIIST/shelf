var mongoose = require('mongoose');

module.exports = mongoose.model('Course', {
	name: 			String,
	acronym: 		String,
	year: 			Number,
	semester: 		Number,
	teachers: 		[{type: String, index: {unique: true, dropDups: true}}]
});
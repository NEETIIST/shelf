var mongoose = require('mongoose');

module.exports = mongoose.model('Course', {
	name: 			String,
	acronym: 		{ type: String, unique: true},
	year: 			Number,
	semester: 		Number,
	teachers: 		[{type: String, index: {unique: true, dropDups: true}}]
});
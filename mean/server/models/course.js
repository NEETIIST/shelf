var mongoose = require('mongoose');

module.exports = mongoose.model('Course', {
	name: 		String,
	acronym: 	String
});
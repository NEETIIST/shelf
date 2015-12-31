var mongoose = require('mongoose');

module.exports = mongoose.model('Degree', {
	name: 		String,
	acronym: 	String,
	id: 		String
});
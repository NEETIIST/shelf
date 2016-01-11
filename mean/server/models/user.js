var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: 		String,
	name: 			String,
	admin: 			Boolean,
	accessToken: 	String,
	refreshToken: 	String
});
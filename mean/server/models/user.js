var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: 		String,
	accessToken: 	String,
	refreshToken: 	String
});
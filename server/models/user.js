var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: 		String,
	name: 			String,
	admin: 			{type: Boolean, default:false},
	accessToken: 	String,
	refreshToken: 	String
});
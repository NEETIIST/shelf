var path = require('path');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
    	return next();
    
	res.redirect('/');
}

module.exports = function(app,passport){

	// views
	app.get('/', function (req, res) {
		if (req.isAuthenticated())
			res.sendFile(path.join(__dirname, '../client', 'index.html'));
		else
			res.sendFile(path.join(__dirname, '../client', 'presentation.html'));
	});



	// authentication
	app.get('/logout', function(req, res) {
    	req.logout();
    	res.redirect('/');
	});

	app.get('/auth/fenix',passport.authenticate('oauth2'));

	app.get('/auth/fenix/callback',
	    passport.authenticate('oauth2', { failureRedirect: '/login' }),
	    	function(req, res) {
				res.redirect('/');
			}
	);

}
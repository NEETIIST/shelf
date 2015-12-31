var path = require('path');

module.exports = function(app,passport){

	// views
	app.get('/', function (req, res) {
		if (req.isAuthenticated())
			res.sendFile(path.join(__dirname, '../client', 'index.html'));
		else
			res.sendFile(path.join(__dirname, '../client', 'presentation.html'));
	});

	app.get('/preview', function (req, res) {
		if (req.isAuthenticated())
			res.sendFile(path.join(__dirname, '../client/views/', 'preview.html'));
		else
			res.redirect('/');
	});



	// authentication
	app.get('/logout', function(req, res) {
    	req.logout();
    	res.redirect('/');
	});

	app.get('/auth/fenix',passport.authenticate('oauth2'));

	app.get('/auth/google/callback',function(req,res){
		res.send(req.query.code);
	});
	app.get('/auth/fenix/callback',
	    passport.authenticate('oauth2', { failureRedirect: '/login' }),
	    	function(req, res) {
				res.redirect('/');
			}
	);

}
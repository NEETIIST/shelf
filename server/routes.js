var path = require('path');

var document	= require("./controllers/document"),
	course 		= require("./controllers/course"),
	degree 		= require("./controllers/degree"),
	upload 		= require("./controllers/upload"),
	tag 		= require("./controllers/tag"),
	teacher 	= require("./controllers/teacher"),
	report 		= require("./controllers/report"),
	admin 		= require("./controllers/admin"),
	type 		= require("./controllers/type");


function isLoggedIn(req,res,next){
	if (req.isAuthenticated()) return next();
	res.redirect('/');
}

module.exports = function(app,passport){

	// Views
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



	// REST API

	app.get('/api/admin/docs', admin.isAdmin, admin.getDocs);
	app.get('/api/admin/reports', admin.isAdmin, admin.getReport);
	app.get('/api/admin/users', admin.isAdmin, admin.getAdmin);
	app.post('/api/admin/docs', admin.isAdmin, admin.docUpdate);
	app.post('/api/admin/users', admin.isAdmin, admin.updateAdmin);
	app.post('/api/admin/reports', admin.isAdmin, admin.updateReport);
	
	app.get('/api/degrees', isLoggedIn, degree.getDegrees);
	app.get('/api/:course/terms', isLoggedIn, degree.getTerms);

	app.get('/api/user/courses', isLoggedIn, course.getUserCourses);
	app.get('/api/course/:course', isLoggedIn, course.getCourse);
	app.get('/api/:degree/courses', isLoggedIn, course.getCoursesByDegree);

	app.get('/api/user/docs', isLoggedIn, document.getUserDocs);
	app.get('/api/docs/:docid', isLoggedIn, document.getDocById);
	app.get('/api/:course/docs', isLoggedIn, document.getDocs);
	app.post('/api/:course/docs', isLoggedIn, document.createDoc);

	app.post('/api/reports', isLoggedIn, report.createReport);
	
	app.get('/api/:degree/types', isLoggedIn, type.getTypesByDegree);
	app.get('/api/:course/doctypes', isLoggedIn, type.getTypesByCourse);
	
	app.get('/api/:course/docteachers', isLoggedIn, teacher.getDocsTeachers);
	app.get('/api/:course/teachers', isLoggedIn, teacher.getCourseTeachers);
	
	app.get('/api/:course/tags', isLoggedIn, tag.getTags);
	
	
	app.get('/api/user', isLoggedIn, admin.getUser);

	require('./controllers/upload')(app);
	



	// Authentication
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
	    	function(req, res) { res.redirect('/'); }
	);



	// 404
	app.use(function(req,res){
		res.redirect('/');
	});

};
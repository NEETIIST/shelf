var Document  = require("../models/document");
var Report  = require("../models/report");
var User  = require("../models/user");


module.exports.isAdmin = function(req, res, next){
  if (req.isAuthenticated()){
    User.findOne({username:req.user.username},function(err,user){
      if(user.admin)
        return next();
      else
        res.redirect('/');
    });
  }else{
    res.redirect('/');
  }
};

module.exports.getDocs = function(req,res){

	console.log("\nGET /api/admin/docs");

	Document.find({ approved: false }, 
    	function (err, results) {
       
    		console.log("\tDOCUMENTS json response");
        	res.json(results);
      	}
    );
};

module.exports.getReport = function(req,res){

	console.log("\nGET /api/admin/reports");

	Report.find({visible:true}, 
    	function (err, results) {
    		console.log("\tDOCUMENTS json response");
        	res.json(results);
      	}
    );
};

module.exports.docUpdate = function(req,res){
    
    console.log("\nPOST /api/admin/docUpdate");
    
    data = req.body;

    Document.updateOne(
      { _id : data._id},
      {
        $set: { "approved": true }
      }, function(err, results) {
      console.log(results);
      callback();
   });
    
};

module.exports.getAdmin = function(req,res){
  
  console.log("\nGET /api/admin/users");

  User.find({ admin: true }, 
      function (err, results) {
        console.log("\tDOCUMENTS json response");
          res.json(results);
        }
    );
};

module.exports.updateAdmin = function(req,res){
  
  console.log("\nPOST /api/admin/users");
  data = req.body;
  
 

  User.findOne({ 'username' : data.username }, function(err, user) {

    if (err)
        res.json({success:false});
    if (user) {
        user.admin = data.admin;
        user.save();

        res.json({success:true});
    }
    else {
                
        User.create({
            username : data.username,
            admin: data.admin

        }, function(err,user){
            if (err)
                res.json({success:false});
            res.json({success:true});
        })
    }  
  })
  
    
};

module.exports.updateReport = function(req,res){
  
  console.log("\nPOST /api/admin/reports");
  data = req.body;
 
 

  User.findOne({ _id : data._id }, function(err, user) {
    if (err){
        res.json({success:false});
    }
    user.visible= false;
    user.save();
    res.json({success:true});
   
  })
  
    
};

module.exports.getUser = function(req,res){
  
  console.log("\nget /api/user");
  


   User.findOne({ username: req.user.username}, 
      function (err, results) {
        console.log("\tDOCUMENTS json response");
          res.json({username: results.username , admin: results.admin, name: results.name});
        }
    );

  
    
};











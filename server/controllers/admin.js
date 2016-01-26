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

	Document.find({ approved: false, hide: false }, 
    	function (err, results) {
       
    		console.log("\tDOCUMENTS json response");
        	res.json(results);
      	}
    );
};

module.exports.docUpdate = function(req,res){
    
  console.log("\nPOST /api/admin/docs");
  
  data = req.body;
   

  Document.findOne({ _id :data._id}, function(err, doc) {
    if (err){
      res.json({success:false});
    }

    if(data.name!=null && data.name!="")
      doc.name = data.name;
    
    if(data.type!=null && data.type!="")
      doc.type = data.type;
    
    if(data.teacher!=null && data.teacher!="")
      doc.teacher = data.teacher; 
    
    if(data.academicTerm!=null && data.academicTerm!='')
      doc.academicTerm = data.academicTerm;
    
    if(data.course!=null && data.course!='')
      doc.course = data.course;
    
    if(data.tags!=null && data.tags!='')
      doc.tags = data.tags;

    if(data.approved!=null && data.approved!='')
      doc.approved = data.approved;

    if(data.hide!=null && data.hide!='')
      doc.hide = data.hide;

    console.log(doc);
    doc.save();
    res.json({success:true});
   
  })
    
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
  if(data.username.indexOf("ist1")==-1){
      console.log("admin está num formato incorreto")
      res.json({success:false});
  }
 

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

module.exports.getReport = function(req,res){

  console.log("\nGET /api/admin/reports");

  Report.find({visible:true}, 
      function (err, results) {
        console.log("\tDOCUMENTS json response");
          res.json(results);
        }
    );
};

module.exports.updateReport = function(req,res){
  
  console.log("\nPOST /api/admin/reports");
  data = req.body;
 
 

  Report.findOne({ _id : data._id }, function(err, report) {
    if (err){
        res.json({success:false});
    }
    report.visible= false;
    report.save();
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











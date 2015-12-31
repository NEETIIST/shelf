var google = require('googleapis');
 var fs = require('fs');
var service = google.drive('v2');
var Drive = require("./functions");




//////////functions/////////////////////////////////////////////////
exports.listChildFiles = function (auth,parents,done) {
 
  service.children.list({
    auth: auth,
    folderId: parents

    
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return done(null,files);
    }
    var files = response.items;
    if (files.length == 0) {
      console.log('No files found.');
      return done(null,files);
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        
      }
      Drive.listFiles(auth,files, function(err, fileschild){


        return done(null,fileschild );
      })
      

    }
  });
}

//////////functions/////////////////////////////////////////////////
exports.listFiles = function (auth,childsID,done) {

 fileschild=[];
  service.files.list({
    auth: auth,

    
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    var files = response.items;
    if (files.length == 0) {
      console.log('No files found.');
      return done(null, files);
    } else {
      console.log('Files:');
      for (var i = 0; i < childsID.length; i++) {
        for (var p = 0; p < files.length; p++) {
         
          if(childsID[i].id==files[p].id){
            fileschild.push(files[p]);
             
          }

        }  
      }
      
      return done(null, fileschild);

    }
  });
}


exports.folder=function(auth,course,term,done){
  var paternsId=0;
 
  Drive.listChildFiles(auth,"0B-je9j5AlDQSN1hESldTdENHQ0E", function(err, filesCourses){
    var filesCoursesName=[];
  

    for (var i = 0; i < filesCourses.length; i++) {

      filesCoursesName.push(filesCourses[i].title);
        
    }
    if (filesCoursesName.indexOf(course) > -1) {
      for (var i = 0; i < filesCourses.length; i++) {
          if(filesCourses[i].title==filesCoursesName[filesCoursesName.indexOf(course)]){
            paternsId=filesCourses[i].id
          }
         
      }

      Drive.listChildFiles(auth,paternsId, function(err, filesTerms){
        var filesTermsName=[];

        for (var i = 0; i < filesTerms.length; i++) {

          filesTermsName.push(filesTerms[i].title);
        
        }

          if (filesTermsName.indexOf(term) > -1) {
            

            
            
              
              return done(null,filesTerms[filesTermsName.indexOf(term)].id );
           

          } else {
            Drive.createFolder(term,auth,paternsId, function(err, id){
             
              return done(null,id );
            })
          }

    })
   
    } else {
      Drive.createFolder(course,auth,"0B-je9j5AlDQSN1hESldTdENHQ0E", function(err, id){
         Drive.createFolder(term,auth,id, function(err, termId){
            return done(null,termId );
          })
      })
    }
   
  
    })      
}





exports.createFolder =function (title,auth,parents,done){
  
  service.files.insert({
    auth: auth,
    resource: {
        mimeType: 'application/vnd.google-apps.folder',
        title: title,
        parents: [{"id":parents}]
    }
},function(err,response){
    if(err){
        console.log('error at gdrive create folder: ' + err);
    }else{
        
        console.log('create response: ' + response.id);
        return done(null,response.id);
    }
});
}


exports.createFile =function (title,auth,parents,done){
 


  service.files.insert({
   auth: auth,
   resource: {
      title: title,
    
      parents: [{"id":parents}]
    },
    media: {
      
      body: fs.createReadStream(title) // read streams are awesome!
    }
  }, done);  
   
}


exports.insert =function (auth,file,course,term,done){

  Drive.folder(auth,course,term,function(err,id){
    Drive.createFile(file,auth,id,function(err,done){
    })

  })
 


  
   
}























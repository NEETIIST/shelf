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
      return done(null);
    }
    var files = response.items;
    if (files.length == 0) {
      console.log('No files found.');
      return done(null);
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.id);
        
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
            console.log("caralho ja está criada burro")
              return done(null,paternsId );

          } else {
            Drive.createFolder(term,auth,paternsId, function(err, id){
              console.log("criaste uma pasta com o nome de " + term)
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
    return done(null,1 );
  
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
      title: 'test.txt',
    
      parents: [{"id":"0B-je9j5AlDQSN1hESldTdENHQ0E"}]
    },
    media: {
      
      body: fs.createReadStream('coco.png') // read streams are awesome!
    }
  }, done);  
  


  
}









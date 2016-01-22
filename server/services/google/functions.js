require("./config.js");
var Drive = require("./functions");

//////////functions/////////////////////////////////////////////////
listChildFiles = function (auth,parents,done) {
 
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
      
      for (var i = 0; i < files.length; i++) {
        var file = files[i];  
      }
      listFiles(auth,files, function(err, fileschild){

        return done(null,fileschild );
      })
      

    }
  });
}

//////////functions/////////////////////////////////////////////////
listFiles = function (auth,childsID,done) {

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


folder=function(auth,course,term,done){
  var paternsId=0;
  listChildFiles(auth,ROOTFOLDER, function(err, filesCourses){
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
      listChildFiles(auth,paternsId, function(err, filesTerms){
        var filesTermsName=[];
        for (var i = 0; i < filesTerms.length; i++) {
          filesTermsName.push(filesTerms[i].title);
        }
        if (filesTermsName.indexOf(term) > -1) {
          return done(null,filesTerms[filesTermsName.indexOf(term)].id );
        } else {
          createFolder(term,auth,paternsId, function(err, id){ 
            return done(null,id );
            })
          }
    }) 
    } else {
      createFolder(course,auth,ROOTFOLDER, function(err, id){
         createFolder(term,auth,id, function(err, termId){
            return done(null,termId );
          })
      })
    }
    })      
}





createFolder =function (title,auth,parents,done){
  
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
            
        return done(null,response.id);
    }
});
}


createFile =function (title,auth,parents,done){
 


  service.files.insert({
   auth: auth,
   resource: {
      title: title,
    
      parents: [{"id":parents}]
    },
    media: {
      
      body: fs.createReadStream(title) 
    }
  }, function(err,response){
    done(null,response.id);
  });  
   
}


exports.insert =function (file,course,term,done){
  
  oauth2Client.refreshAccessToken(function(err, tokens) {
   folder(oauth2Client,course,term,function(err,id){
    createFile(file,oauth2Client,id,function(err,fileID){
      done(null,"https://drive.google.com/open?id="+fileID)
    })

  })
  });
 
    
}

Drive.insert("config.js","janeiro","2016",function(err,argument) {
    console.log(argument);
    })























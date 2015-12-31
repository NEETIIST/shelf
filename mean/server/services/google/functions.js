var ROOTFOLDER = "0B-je9j5AlDQSN1hESldTdENHQ0E";
var google = require('googleapis');
 var fs = require('fs');
var service = google.drive('v2');
var Drive = require("./functions");
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2("447918343020-v6nna41qs6lon9s58sfkruq1hid9j1h8.apps.googleusercontent.com", 
                "30Fm8I1-JPMhI2Yb8x3XSquT", 
                "http://shelf.n1z.pt/auth/google/callback");

oauth2Client.setCredentials({
  access_token: 'ya29.WwLjn9R1F1I6CajJwvdGjk0z_iY2ybx5uwBo0F-wgJ9c0wamK72nyJqctWoiFEDcE20PPA'
  
});

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

  folder(oauth2Client,course,term,function(err,id){
    createFile(file,oauth2Client,id,function(err,fileID){
      done(null,"https://drive.google.com/open?id="+fileID)
    })

  })   
}

Drive.insert("functions.js","ist","neeti",function(err,argument) {
    console.log(argument);
    })







/****************refresh token**********************

oauth2Client.refreshAccessToken(function(err, tokens) {
  // your access_token is now refreshed and stored in oauth2Client
  // store these new tokens in a safe place (e.g. database)
});

*****************************************************************************/

















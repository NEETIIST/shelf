


drive.files.insert({
    auth: oauth2Client,
    resource: {
        mimeType: 'application/vnd.google-apps.folder',
        title: 'Arquitectura de Redes',
        parents: ['FolderID-of-ParentFolder']
    }
},function(err,response){
    if(err){
        console.log('error at gdrive create folder: ' + err);
    }else{
        console.log('create response: ' + response);
    }
});
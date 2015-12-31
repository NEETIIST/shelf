console.log("lista de files");
    console.log(" ");
    console.log(files);

    var father=0;
    var iN=0;
    var i;
    console.log(pathArrey.length);
    for ( i = 0; i< pathArrey.length; i++) {
        iN=0;
        console.log("cliclo");

        for (var p = 0; p< files.length; p++) {  //cliclo dos files
          if (pathArrey[i]==files[p].title){
           
            if(father.length==0)
            {
              iN=1;
              father=files[p].id
               p==files.length;
            }
            if(files[p].parents.id ==father)
            {
              iN=1;
              father=files[p].id
              p==files.length;
            }
          }
        }
        if(iN==0){
          console.log("criava");
          console.log(" ");
          console.log(pathArrey[i]+" "+" "+parents);
          //createFolder(pathArrey[i],auth,parents);
        }


    };
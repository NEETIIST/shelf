var pathArrey= path.split("/");
  var files=listFiles(auth);
  var father={};
  var iN=0;

  for (var i = 0; i< pathArrey.length; i++) {
      iN=0;

      for (var p = 0; p< files.length; p++) {  //cliclo dos files
        if (pathArrey[i]==files[p].title){
          p==files.length;
          iN=1;

          
        }

      
      };


  };
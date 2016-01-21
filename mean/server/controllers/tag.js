var Document  = require("../models/document");

module.exports.getTags = function(req,res) {

    console.log("\nGET /api/"+req.params.course+"/tags");

    Document.find({ course: { $regex : new RegExp(req.params.course, "i") }, approved: true }, 
        function (err, results) {
            tags = [];

            for(i=0; i<results.length; i++){
                for(k=0; k<results[i].tags.length; k++){
                    if(results[i].tags[k]){
                        
                        if(tags.indexOf(results[i].tags[k].text)==-1)
                           
                            tags.push(results[i].tags[k].text)
                             
                            
                    }     
                }
               
            }
            
            console.log("\tCOURSE TAGS json response");
             console.log(tags);
            res.json(tags);
        }
    );
};
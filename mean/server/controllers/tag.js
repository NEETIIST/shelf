var Document  = require("../models/document");

module.exports.getTags = function(req,res) {

    console.log("\nGET /api/"+req.params.course+"/tags");

    Document.find({ course: req.params.course, approved: true }, 
        function (err, results) {
            tags = [];
            for(i=0; i<results.length; i++){
                tags = tags.concat(results[i].tags).unique();
            }
            
            console.log("\tCOURSE TAGS json response");
            
            res.json(tags);
        }
    );
};
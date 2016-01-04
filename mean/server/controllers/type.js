var Document  = require("../models/document");


module.exports.getTypesByCourse   = function(req,res) {

    console.log("\nGET /api/"+req.params.course+"/types");

    Document.find({ course: req.params.course, approved: true }, 
        function (err, results) {
            types = [];
            for(i=0; i<results.length; i++){
                if(results[i].type) types.push(results[i].type)
            }
            types.unique();
            console.log(types);

            console.log("\tCOURSE TYPES json response");


            res.json(types);
        }
    );
};


module.exports.getTypesByDegree  = function(req,res){

    console.log("\nGET /api/leti/types");

    Document.find({approved: true }, 
        function (err, results) {
            var rtypes = [];
            for(i=0; i<results.length; i++){
                if(results[i].type!=undefined)
                    rtypes.push(results[i].type)
            }
            rtypes.unique();

            console.log("\tDEGREE TYPES json response");
            res.json(rtypes);
        }
    );
};
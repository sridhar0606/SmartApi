var db = require('./../model/material');


exports.addMaterial = function (request, response) {

    console.log(request.body)
    request.body.status = 'CREATE';
    
    var newsDB =  new db(request.body);
            console.log(newsDB)
            newsDB.save(function (err, data) {

                if(data){
                    response.json({status:'success',data:null,message:'Material added successfully!'})

                } else {
                    response.json({status:'failure',data:null,message:'Something went wrong!'})
                }

            })


}

exports.materialList = function (request, response) {

    let query = request.body || {};
    db.find(query).populate('staff').exec(function (errors, list) {
        if(list) {
            response.json({status:'success',data:list,message:null})

        } else {
            response.json({status:'failure',data:null,message:'Something went wrong!'});
        }

    })

}
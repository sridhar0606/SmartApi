var db = require('./../model/user');




exports.login = function (request, response) {

    
  
    console.log(request.body)
        let query = { 'email': request.body.email, 'password':request.body.password };

    db.findOne(query).exec(function (errors, checkEmail) {

        if(checkEmail) {

            if(checkEmail.role == 'Staff' && !checkEmail.verified ) {
                
                response.json({status:'warning',message:'Staff not verified',data:null});

            } else {
          
            response.json({status:'success',data:checkEmail,message:'Login successfully!'})

            }

        } else {
            response.json({status:'failure',message:'Invaild Credentials',data:null});
        }

    })

}

exports.signup = function (request, response) {

        console.log(request.body)
    db.findOne({email: request.body.email }).exec(function (errors, checkEmail) {


        console.log(checkEmail)
        if(checkEmail) {
            response.json({status:'failure',data:null,message:'User already exists!'})

        } else {
            var userDB =  new db(request.body);
            userDB.user_id = userDB._id
            if(userDB.role == 'Staff'){
                userDB.verified = false
            }
            console.log(userDB)
            userDB.save(function (err, data) {

                if(data){
                    response.json({status:'success',data:null,message:'User signup successfully!'})

                } else {
                    response.json({status:'failure',data:null,message:'Something went wrong!'})
                }

            })
        }

    })

}

exports.userDetails = function (request, response) {
console.log(request.params.user_id)
    db.findOne({ '_id': request.params.user_id },{password: 0}).exec(function (errors, checkId) {

        if(checkId) {
            response.json({status:'success',data:checkId,message:null})

        } else {
            response.json({status:'failure',message:'Invaild Credentials',data:null});
        }

    })
}

exports.userList = function (request, response) {

    var query = request.body || {};
    var projection = {password:0}
    db.find(query,projection).exec(function (errors, list) {

        if(list) {
            response.json({status:'success',data:list,message:null})

        } else {
            response.json({status:'failure',data:null,message:'Something went wrong!'})
        }

    })
}

exports.userUpdate = function (request, response) {

    var query = request.body.query || {};
    var updateData = request.body.data
    console.log(query,updateData)
    db.update(query,{$set:updateData}).exec(function (errors, list) {

        if(list) {
            response.json({status:'success',data:null,message:'User updated successfully'})

        } else {
            response.json({status:'failure',data:null,message:'Something went wrong!'})
        }

    })
}



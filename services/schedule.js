var db = require('./../model/schedule');


exports.addSchedule = function (request, response) {

    console.log(request.body)
    request.body.status = 'CREATE';
    let query = {
        period : request.body.period,
        staff : request.body.staff,
        schedule_date : request.body.schedule_date,
    }
    console.log(query)

  db.findOne(query).exec(function (errors, checkEmail) {


        console.log(checkEmail)
        if(checkEmail) {
            response.json({status:'failure',data:null,message:'Already class schedule !'})

        } else {
            var userDB =  new db(request.body);
            console.log(userDB)
            userDB.save(function (err, data) {

                if(data){
                    response.json({status:'success',data:null,message:'Class scheduled successfully!'})

                } else {
                    response.json({status:'failure',data:null,message:'Something went wrong!'})
                }

            })
        }

    })

}


exports.scheduleList = function (request, response) {
    console.log(new Date(request.body.schedule_date));
    console.log(request.body.schedule_date);

     var query = request.body || {};
     if(query.schedule_date){
    let startdate = request.body.schedule_date;
        var date = new Date(startdate);
        date.setHours(0, 0, 0, 0);
        var endDate = new Date(date);
        endDate.setHours(23, 59, 59, 59);

        query.schedule_date = { $gte: date, $lt: endDate }
     }

    console.log("scheduleList query :",query);
    db.find(query).populate('staff').exec(function (errors, list) {
        if(list) {
            response.json({status:'success',data:list,message:null})

        } else {
            response.json({status:'failure',data:null,message:'Something went wrong!'});
        }

    })
}
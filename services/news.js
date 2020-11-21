var db = require('./../model/news');


exports.addNews = function (request, response) {

    console.log(request.body)
    request.body.status = 'CREATE';
    
    var newsDB =  new db(request.body);
            console.log(newsDB)
            newsDB.save(function (err, data) {

                if(data){
                    response.json({status:'success',data:null,message:'News added successfully!'})

                } else {
                    response.json({status:'failure',data:null,message:'Something went wrong!'})
                }

            })


}


exports.newsList = function (request, response) {
    console.log(new Date(request.body.schedule_date));
    console.log(request.body.schedule_date);

     var query = request.body || {};
     if(query.schedule_date){
    let startdate = request.body.schedule_date;
        var date = new Date(startdate);
        date.setHours(0, 0, 0, 0);
        var endDate = new Date(date);
        endDate.setHours(23, 59, 59, 59);

        query.end_date = { $gte: date, $lt: endDate }
     }

    console.log("News List query :",query);
    db.find(query).populate('staff').exec(function (errors, list) {
        if(list) {
            response.json({status:'success',data:list,message:null})

        } else {
            response.json({status:'failure',data:null,message:'Something went wrong!'});
        }

    })
}
exports.fileUpload = function (request, response) {
   
}
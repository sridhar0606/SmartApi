const express = require('express');
const bodyParser = require('body-parser');
const db = require('./controller/db');
const http = require('http');
const cors = require('cors');
const app = express();
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet'),
session = require('express-session'),
cookieParser = require('cookie-parser');
var formidable = require('formidable');

var multer  =   require('multer');  

var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploads');  
    },  
    filename: function (req, file, callback) {  
        console.log(file)
      callback(null, file.originalname);  
    }  
  });  

var upload = multer({ storage : storage});  
var user = require('./services/user');
var news = require('./services/news');
var material = require('./services/material');
var schedule = require('./services/schedule');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './uploads')));
app.use(express.static(__dirname + '/uploads'));

app.use(cors());

app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'sdlfjljrowuroweu',
    cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var enableCORS = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', request.headers.origin);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Date, X-Date');
    return next();
};

app.use(enableCORS);




http.createServer(app).listen(8088, function () {


    console.log('===========================================================');

    console.log('Sever running on the port :' + 8088)

    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')


})



app.get('/data', function (req, res) {
    res.send(req.connection.remoteAddress)
})

app.get('/', function (req, res) {
    console.log(req.session.email);

    res.send('API Working successfully'+req.session.email)
})

/**  List API functions **/

/*** ====================================> Users  API Functions <==========================================***/

app.post('/api/login',user.login);

app.post('/api/signup',user.signup);

app.get('/api/userDetails/:user_id',user.userDetails);

app.post('/api/userList',user.userList);

app.post('/api/userUpdate',user.userUpdate);


app.post('/api/addSchedule',schedule.addSchedule);

app.post('/api/scheduleList',schedule.scheduleList);

app.post('/api/addNews',news.addNews);

app.post('/api/newsList',news.newsList);

app.post('/api/fileUpload',upload.single('streamfile'),function(req, res){
     res.send('file Upload')
})

app.post('/api/addMaterial',material.addMaterial);

app.post('/api/materialList',material.materialList);
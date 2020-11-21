var mongoose = require('mongoose');
var dbUri ='mongodb://localhost:27017/smartClass';

var dbconnect = dbUri;
mongoose.connect(dbconnect);

mongoose.connection.on('connected', function () {
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});

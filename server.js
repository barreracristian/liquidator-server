var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
//var session       = require('express-session');
var bodyParser      = require('body-parser');
var http            = require('http');

var app = express();

var api = require('./routes/api');

app.use('/api', api);

app.get('/main', function(req, res) {
    res.sendfile('./www/templates/main.html');
});

app.use(express.static('www'));
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(session({secret: 'ill be back'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('liquidator-server at http://%s:%s', host, port);
});

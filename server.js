var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var session       = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var moment = require('moment');
var _ = require('lodash');
var io = require('socket.io')(4000);

var app = express();

var api = require('./routes/api');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', api);

app.get('/main', function (req, res) {
    res.sendfile('./www/templates/main.html');
});

app.use(express.static('www'));
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(session({secret: 'ill be back'}));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('liquidator-server at http://%s:%s', host, port);
});

var roomName = "room";
var bitacora = {};

var bitacoraDefault = [
    {
        sinId: 0,
        date: moment().subtract(23, 'days').subtract(1, 'second'),
        type: 'ingreso denuncia',
        detail: 'telefónicamente',
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(22, 'days').subtract(2, 'second'),
        type: 'ingreso taller',
        detail: 'tentativo por correo',
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(20, 'days').subtract(3, 'second'),
        type: 'inspeccion liquidador',
        detail: 'daños graves',
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(20, 'days').subtract(4, 'second'),
        type: 'ingreso de datos al sistema',
        detail: undefined,
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(19, 'days').subtract(5, 'second'),
        type: 'petición de cotización más garantía',
        detail: 'Repuestos pueden tardar debido a importación',
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(19, 'days').subtract(6, 'second'),
        type: 'observation',
        detail: 'más garantia confirma que los repuestos tardarán en llegar. Problemas de disponibilidad del importador.',
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(16, 'days').subtract(7, 'second'),
        type: 'recepción cotizacion',
        detail: undefined,
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(15, 'days').subtract(8, 'second'),
        type: 'recepción repuestos taller',
        detail: undefined,
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(15, 'days').subtract(9, 'second'),
        type: 'en reparacion repuestos taller',
        detail: undefined,
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(12, 'days').subtract(10, 'second'),
        type: 'observation',
        detail: undefined,
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(9, 'days').subtract(11, 'second'),
        type: 'call',
        detail: 'reclamo por demora en reparación',
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(1, 'days').subtract(12, 'second'),
        type: 'Retiro VH en taller',
        detail: undefined,
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(1, 'days').subtract(13, 'second'),
        type: 'Retiro en taller por asegurado',
        detail: undefined,
        user_id: 0
    },
    {
        sinId: 0,
        date: moment().subtract(1, 'days').subtract(14, 'second'),
        type: 'Recibo de conformidad',
        detail: undefined,
        user_id: 0
    }
];

app.get('/bitacora/:sinId', function (req, res, next) {
    //console.log("------------------ req = " + JSON.stringify(req.params, null, 2));
    var sinId = req.params.sinId;

    var b = _.map(_.cloneDeep(bitacoraDefault), function (item) {
        item.sinId = sinId;
        return item;
    });

    return res.json(b.concat(bitacora[sinId]));
});

io.on('connection', function (socket) {

    socket.on('join:room', function (data) {
        console.log("------------------ join:room = " + JSON.stringify(data));
        socket.join(roomName);
        socket.emit('message', "holanda");
    });

    socket.on('leave:room', function (msg) {
        console.log("------------------ leave:room = " + JSON.stringify(msg));
        msg.text = msg.user + " has left the room";

        socket.in(roomName).emit('exit', msg);
        socket.leave(roomName);
    });

    socket.on('send:message', function (msg) {
        console.log("------------------ send:message = " + JSON.stringify(msg));

        socket.in(roomName).emit('message', msg);
    });

    socket.on('send:action', function (action) {
        console.log("------------------ send:action = " + JSON.stringify(action));

        var theAction = {
            sinId: action.sinId,
            date: moment(),
            type: action.type,
            detail: action.detail,
            user_id: 0
        };

        bitacora[action.sinId] = bitacora[action.sinId] || [];
        bitacora[action.sinId].push(theAction);
    });

});

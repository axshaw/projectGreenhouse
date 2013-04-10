
/*jslint node: true */
var enviroment = process.env.PGH;

console.log("env = " + enviroment);
var outgoing; //setup connection place holder
var responseArray = {}; //setup responseArray!
responseArray.dayMin = null;
responseArray.dayMax = null;
responseArray.weekMin = null;
responseArray.weekMax = null;
responseArray.monthMin = null;
responseArray.monthMax = null;
responseArray.sensorData = null;

//setup db connection for sensor store
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'synology',
    user     : 'greenhouse',
    password : 'arduino',
    database : 'projectGreenhouse'
});

//open connection to data store
console.log("connecting to Mysql .....");
connection.connect(function(err) {
    "use strict";
    if (err) {
        console.log("ERROR: " + err.message);
        /* jslint node: true */
        process.exit();
    } else {
        console.log("connected to mysql.");
    }
});

//setinterval call to gather reporting stats
setInterval(function() {
    "use strict";
    //fetch amalgamated data for averages
    connection.query('SELECT min(value) as minTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 1 DAY', function(err, rows) {
        responseArray.dayMin = rows[0].minTemp;
    });

    connection.query('SELECT max(value) as maxTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 1 DAY', function(err, rows) {
        responseArray.dayMax = rows[0].maxTemp;
    });
    connection.query('SELECT min(value) as minTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 7 DAY', function(err, rows) {
        responseArray.weekMin = rows[0].minTemp;
    });
    connection.query('SELECT max(value) as maxTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 7 DAY', function(err, rows) {
        responseArray.weekMax = rows[0].maxTemp;
    });
    connection.query('SELECT min(value) as minTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 28 DAY', function(err, rows) {
        responseArray.monthMin = rows[0].minTemp;
    });
    connection.query('SELECT max(value) as maxTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 28 DAY', function(err, rows) {
        responseArray.monthMax = rows[0].maxTemp;
    });

}, 60000);


//connect to data server
var WebSocketconn = require('ws');
var dataSocket = new WebSocketconn('ws://localhost:8784');
console.log("connecting to data network");
dataSocket.on('open', function() {
    "use strict";
    console.log("connected to data server");
    //create local socket server to push data out, do this if connection is made to stats server
    var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8181});
    wss.on('connection', function(ws) {
        outgoing = ws;
        console.log(" incoming connection made");
    });

    wss.on('close', function() {
        outgoing = null;
    });
});


dataSocket.on('message', function(message) { //when data recieved from sensor net
    "use strict";
    console.log('received: %s', message);
    //iron out data array for multiple sensors
    //send database insert
    var post  = {sensorId: parseFloat('001'), value: parseFloat(message)},
        query = connection.query('INSERT INTO sensorData SET ?', post, function(err) {
            if (err !== null) {
                console.log(err);
            }
        });
    console.log(query.sql);
    //format response
    responseArray.sensorData = message;

    //if websocket connections exist send the data back to the clients
    if (typeof outgoing === "object") {
        console.log(JSON.stringify(responseArray));
        outgoing.send(JSON.stringify(responseArray), function(error) {
            console.log(error);
        });
    }
});

dataSocket.on('error', function(message) {
    "use strict";
    console.log('error: ' + message);
});
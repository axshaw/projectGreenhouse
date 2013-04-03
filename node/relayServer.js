//setup db connection for sensor store
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'synology',
  user     : 'greenhouse',
  password : 'arduino',
  database : 'projectGreenhouse',
});

console.log("connecting to Mysql .....");

connection.connect(function(err, results) {
    if (err) {
        console.log("ERROR: " + err.message);
        throw err;
        process.exit();
        }else   {
            console.log("connected to mysql.");
   }
});


var outgoing; //setup connection place holder
 var responseArray;
//connection.end();

//listen for connection

//connect to data server
var WebSocket = require('ws');
var dataSocket = new WebSocket('ws://localhost:8784');
console.log("connecting to data network");
dataSocket.on('open', function() {
  console.log("connected to data server")

  var WebSocketServer = require('ws').Server
    ,wss = new WebSocketServer({port: 8181});
  wss.on('connection', function(ws) {
    outgoing = ws;
    console.log(" incoming connection made");
  });
});


dataSocket.on('message', function(message) { //when data recieved from sensor net
  console.log('received: %s', message);
  responseArray={};
  //iron out data array for multiple sensors

  //send database insert
  var post  = {sensorId: parseFloat('001'), value: parseFloat(message)};
  var query = connection.query('INSERT INTO sensorData SET ?', post, function(err, result) {
    //console.log(result + " " + err);
  });
  console.log(query.sql);

  //fetch amalgamated data for averages
  connection.query( 'SELECT min(value) as minTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 1 DAY', function(err, rows) {
    // And done with the connection.
    responseArray['dayMin'] = rows[0].minTemp;
    console.log('24min: '+rows[0].minTemp);
  });

connection.query( 'SELECT max(value) as maxTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 1 DAY', function(err, rows) {
    // And done with the connection.
    console.log('24max: '+rows[0].maxTemp);
    responseArray['dayMax'] = rows[0].maxTemp;
  });
  //format response

  responseArray['sensorData'] = message;

  //if websocket connections exist send the data back to the clients
  if( typeof outgoing ==="object") {
    console.log(JSON.stringify(responseArray));
    outgoing.send(JSON.stringify(responseArray));
  }


});

dataSocket.on('error',function(message){
  console.log('error: '+message);
});

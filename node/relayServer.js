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
  var responseArray={};
  //iron out data array for multiple sensors

  //send database insert
  var post  = {sensorId: parseFloat('001'), value: parseFloat(message)};
  var query = connection.query('INSERT INTO sensorData SET ?', post, function(err, result) {
    console.log(result + " " + err);
  });
  console.log(query.sql);

  //fetch amalgamated data for averages
  connection.query( 'SELECT min(value) FROM sensorData WHERE timestamp >= NOW() - INTERVAL 1 DAY', function(err, rows) {
    // And done with the connection.
    responseArray['24hourMin'] = rows;
    console.log(rows);
  });


  //format response


  //if websocket connections exist send the data back to the clients
  if( typeof outgoing ==="object") {
    outgoing.send(message);
  }


});

dataSocket.on('error',function(message){
  console.log('error: '+message);
});

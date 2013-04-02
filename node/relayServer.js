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
//console.log('conect:'connection);
dataSocket.on('message', function(message) {
  console.log('received: %s', message);
  var post  = {sensorId: parseFloat('001'), value: parseFloat(message)};
 // console.log(post);
//  console.log(connection);

  var query = connection.query('INSERT INTO sensorData SET ?', post, function(err, result) {
  // Neat!
  });
  console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

  if( typeof outgoing ==="object") {
    outgoing.send(message);
  }
//  wss.send(message);
});

dataSocket.on('error',function(message){
  console.log('error: '+message);
});

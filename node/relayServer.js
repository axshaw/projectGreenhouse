//setup db connection for sensor store
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'synology',
  user     : 'greenhouse',
  password : 'arduino',
  database : 'projectGreenhouse',
});

//open connection to data store
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
 var responseArray={}; //setup responseArray!


//setinterval call to gather reporting stats
setInterval(function(){
  
  //fetch amalgamated data for averages
  connection.query( 'SELECT min(value) as minTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 1 DAY', function(err, rows) {
    responseArray['dayMin'] = rows[0].minTemp;
  });

  connection.query( 'SELECT max(value) as maxTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 1 DAY', function(err, rows) {
    responseArray['dayMax'] = rows[0].maxTemp;
  });
  connection.query( 'SELECT min(value) as minTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 7 DAY', function(err, rows) {
    responseArray['weekMin'] = rows[0].minTemp;
  });

  connection.query( 'SELECT max(value) as maxTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 7 DAY', function(err, rows) {
    responseArray['weekMax'] = rows[0].maxTemp;
  });
  connection.query( 'SELECT min(value) as minTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 28 DAY', function(err, rows) {
    responseArray['monthMin'] = rows[0].minTemp;
  });

  connection.query( 'SELECT max(value) as maxTemp FROM sensorData WHERE timestamp >= NOW() - INTERVAL 28 DAY', function(err, rows) {
    responseArray['monthMax'] = rows[0].maxTemp;
  });

},60000);


//connect to data server
var WebSocket = require('ws');
var dataSocket = new WebSocket('ws://localhost:8784');
console.log("connecting to data network");
dataSocket.on('open', function() {
  console.log("connected to data server")
  //create local socket server to push data out, do this if connection is made to stats server
  var WebSocketServer = require('ws').Server
    ,wss = new WebSocketServer({port: 8181});
  wss.on('connection', function(ws) {
    outgoing = ws;
    console.log(" incoming connection made");
  });
});


dataSocket.on('message', function(message) { //when data recieved from sensor net
  console.log('received: %s', message);
  
  //iron out data array for multiple sensors

  //send database insert
  var post  = {sensorId: parseFloat('001'), value: parseFloat(message)};
  var query = connection.query('INSERT INTO sensorData SET ?', post, function(err, result) {
    //console.log(result + " " + err);
  });
  console.log(query.sql);

  
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

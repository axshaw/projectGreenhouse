//listen for connection

var WebSocketServer = require('ws').Server
  ,wss = new WebSocketServer({port: 8181});
wss.on('connection', function(ws) {     
  console.log(" incoming connection made");
  
});


//connect to data server
var WebSocket = require('ws');
var dataSocket = new WebSocket('ws://192.168.42.150:8784');

  dataSocket.on('open', function() {
    console.log("connected to data")
  });

  dataSocket.on('message', function(message,ws) {
      console.log('received: %s', message);
      sendToClient(message);
  });


function sendToClient(message) {
  WebSocket.send(message);
  console.log("sent");
}

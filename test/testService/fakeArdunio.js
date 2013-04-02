
//create a websocket server and send random temperature data at regular intervals

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});
wss.on('connection', function(ws) {     
	console.log(" incoming connection made");
    setInterval(function()	{
    	var faketemp = Math.floor(Math.random());
    	ws.send(faketemp);
    	console.log(faketemp);
    },60000);
    
});
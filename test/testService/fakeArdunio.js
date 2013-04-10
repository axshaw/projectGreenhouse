
//create a websocket server and send random temperature data at regular intervals

var WebSocketServer = require('ws').Server;
var dataserver = new WebSocketServer({port: 8784});
console.log("hold port");
dataserver.on('connection', function(ws) {     
	console.log(" incoming connection made");
    setInterval(function()	{
    	var faketemp = Math.floor(Math.random()*11);
    	ws.send(faketemp.toString(),function(error){
      		console.log(error);
    });
    	console.log("#: "+faketemp);
    },10000);
    
});

//create a websocket server and send random temperature data at regular intervals

var WebSocketServer = require('ws').Server;
var dataserver = new WebSocketServer({port: 8784});
console.log("hold port");
dataserver.on('connection', function(ws) {     
	console.log(" incoming connection made");
    setInterval(function()	{
    	var faketemp = Math.floor(Math.random()*11);
    	var internalFaketemp = faketemp + 10;
    	var fakeLight = Math.floor(Math.random()*1025);
    	var fakeReturn = '{"2":"' + internalFaketemp + '","1":"' + faketemp + '","3":"' + fakeLight + '"}';
    	ws.send(fakeReturn.toString(),function(error){
      		console.log(error);
    });
    	console.log("#: "+fakeReturn);
    },10000);
    
});
// {{2:23.69},{1:14.00},{3:5}}
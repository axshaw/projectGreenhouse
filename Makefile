test:
	 export NODE_ENV=test
	 node test/testService/fakeArdunio.js &
	 sleep 2
	 node node/relayServer.js &
	 sleep 5
	 cd test; mocha
	 export NODE_ENV=dev
	 killall node
.PHONY: test
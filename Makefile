PROJECT = "Project Greenhouse"
NODE ?= node

test:;
	@echo "Testing ${PROJECT}....";\
	export NODE_ENV=test;\
	echo $$NODE_ENV;\
	$(NODE) test/testService/fakeArdunio.js & \
	sleep 2;\
	$(NODE) node/relayServer.js & \
	sleep 5;\
	cd test; mocha;\
	export NODE_ENV=dev;\
	echo $$NODE_ENV;\
	killall node
.PHONY: test
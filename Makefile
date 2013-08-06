PROJECT = "Project Greenhouse"
NODE ?= node

test:;
	@echo "Testing ${PROJECT}....";\
	export NODE_ENV=test;\
	echo $$NODE_ENV;\
	echo "=======================================\n";\
	echo "Running python tests\n\n";\
	echo "=======================================\n";\
	nosetests --with-cov --cov .;\
	echo " =======================================\n";\
	echo "booting test environment\n\n";\
	echo "=======================================\n";\
	npm install;\
	$(NODE) test/testService/fakeArdunio.js & \
	sleep 2;\
	$(NODE) node/relayServer.js & \
	sleep 5;\
	echo " =======================================\n";\
	echo "running mocha for js tests\n\n";\
	echo "=======================================\n";\
	cd test; mocha;\
	export NODE_ENV=dev;\
	echo $$NODE_ENV;\
	killall node
.PHONY: test
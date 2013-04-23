#!/usr/bin/env bash

echo "---------------------------------------"
echo "Welcome to project Greenhouse test env"
echo "---------------------------------------"
forever start /vagrant/test/testService/fakeArdunio.js
forever start /vagrant/node/relayServer.js
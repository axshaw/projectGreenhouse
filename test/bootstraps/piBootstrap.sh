#!/usr/bin/env bash

apt-get -y update
apt-get install -y nodejs
apt-get install -y npm
apt-get install -y g++
npm install ws
npm install mysql
npm install -g forever
export PGH=dev
echo "-------------------------------------"
echo $PGH
echo "-------------------------------------"
sudo sh -c 'echo "10.11.12.14 synology" >> /etc/hosts'
forever start /vagrant/test/testService/fakeArdunio.js
forever start /vagrant/node/relayServer.js
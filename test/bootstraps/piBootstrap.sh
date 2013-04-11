#!/usr/bin/env bash

apt-get -y update
apt-get install -y nodejs
apt-get install -y npm
apt-get install -y g++
cd /vagrant
npm install
npm install -g forever
export PGH=dev
echo "-------------------------------------"
echo $PGH
echo "-------------------------------------"
sudo sh -c 'echo "10.11.12.14 synology" >> /etc/hosts'
su vagrant
forever start /vagrant/test/testService/fakeArdunio.js
forever start /vagrant/node/relayServer.js
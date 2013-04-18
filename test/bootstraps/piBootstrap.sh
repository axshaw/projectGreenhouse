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
apt-get install -y mysql-server
apt-get install -y mysql-server-5.5
echo mysql-server mysql-server/root_password password strangehat | sudo debconf-set-selections
echo mysql-server mysql-server/root_password_again password strangehat | sudo debconf-set-selections
mysqladmin -uroot -pstrangehat drop projectGreenhouse
mysqladmin -uroot -pstrangehat create projectGreenhouse
mysql  -uroot -pstrangehat projectGreenhouse < /vagrant/test/sql/sensorData.sql
mysql -uroot -pstrangehat mysql < /vagrant/test/sql/users.sql
su vagrant
forever start /vagrant/test/testService/fakeArdunio.js
forever start /vagrant/node/relayServer.js
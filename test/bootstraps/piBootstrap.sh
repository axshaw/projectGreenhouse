#!/usr/bin/env bash

<<<<<<< HEAD
echo "---------------------------------------"
echo "Welcome to project Greenhouse test env"
echo "---------------------------------------"
=======
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
>>>>>>> ffe31d90a1e9ed3d4aaf82fb0a8cf1800eea25a1
forever start /vagrant/test/testService/fakeArdunio.js
forever start /vagrant/node/relayServer.js
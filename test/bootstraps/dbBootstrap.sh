#!/usr/bin/env bash

apt-get -y update
apt-get install -y mysql-server
echo mysql-server mysql-server/root_password password strangehat | sudo debconf-set-selections
echo mysql-server mysql-server/root_password_again password strangehat | sudo debconf-set-selections
apt-get install -y mysql-server-5.5
mysqladmin -uroot -pstrangehat drop projectGreenhouse
mysqladmin -uroot -pstrangehat create projectGreenhouse
mysql  -uroot -pstrangehat projectGreenhouse < /vagrant/test/sql/sensorData.sql
mysql -uroot -pstrangehat mysql < /vagrant/test/sql/users.sql


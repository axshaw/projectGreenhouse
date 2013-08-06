#!/usr/bin/env bash

echo "---------------------------------------"
echo "Welcome to project Greenhouse test env"
echo "---------------------------------------"

apt-get update
apt-get -y install rabbitmq-server
apt-get -y install mongodb-server
echo "ulimit -n 1024" >> /etc/default/rabbitmq-server
gem install bunny 

apt-get install python-pip python-dev build-essential
sudo pip install pika
sudo pip install mock

echo "---------------------------------------"
echo "Setup complete starting services"
echo "---------------------------------------"

echo "starting provisioner (fake arduino)"
#python

echo "starting archive service"
ruby -rubygems /vagrant/ArchiveService/archiveService.rb &

echo "starting nnode web service"
#forever /vagrant/node/webService


#!/usr/bin/env bash

echo "---------------------------------------"
echo "Welcome to project Greenhouse test env"
echo "---------------------------------------"

apt-get update
apt-get -y install rabbitmq-server
#apt-get -y install mongodb-server
apt-get -y install make
echo "ulimit -n 1024" >> /etc/default/rabbitmq-server
sudo gem install bunny 
sudo gem install rspec
sudo gem install serialport


apt-get -y install python-pip python-dev build-essential
apt-get -y install socat

#sudo pip install pika
#sudo pip install mock #dev only really!
sudo pip install nose #dev oly really!
sudo pip install nose-cov
sudo pip install pyserial


echo "---------------------------------------"
echo "Setup complete starting services"
echo "---------------------------------------"

echo "starting provisioner (fake arduino)"
#starts the virtual serial ports
socat -d -d pty,raw,echo=0 pty,raw,echo=0 &




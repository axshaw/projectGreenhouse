projectGreenhouse
=================

Monitoring and automation of my greenhouse.

This project is at very very early alpha stage. Most of the features are yet to be implemented.


The following technology is required.

Raspberry Pi,
Ardunio


There are a number of parts to this project.

Remote Sensor
=============
The remote sensor acts as a hub for data collection and transmission

Data Relay
==========
The data relay collects readings from the remotes and passes it through
websockets to allow live reporting and data storage

Client Scripts
==============
The front end display using web based tools to display live reports


Installation
==============

clone git repository.
npm install

Dev enviroment
==============

The repo comes with a vagrant config that will boot up 3 VMs. The VM enviroment contains a fake ardunio script that randomly generates data to seed the relay and dev db. 

"!https://travis-ci.org/axshaw/projectGreenhouse.png!":https://travis-ci.org/axshaw/projectGreenhouse
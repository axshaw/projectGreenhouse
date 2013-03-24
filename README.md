projectGreenhouse
=================

Monitoring and automation of my greenhouse.

This project is at very very early alpha stage. Most of the features are yet to be implemented.


The following technology is required.

Raspberry Pi
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

projectGreenhouse
=================

Monitoring and automation of my greenhouse

This project is approaching MVP and uses the following technology

Raspberry Pi
Ardunio


There are a number of parts to this project.

Remote Sensor
=============
The remote sensor acts as a hub for data collection and transmission

Data Relay
==========
The data relay collects readings from the remotes and passes it through nodejs
Nodejs organises websockets to allow live reporting and also data stores

Client Scripts
==============
The front end display using web based tools to display live reports

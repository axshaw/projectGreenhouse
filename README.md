projectGreenhouse
=================

Monitoring and automation of my greenhouse. [![Build Status](https://travis-ci.org/axshaw/projectGreenhouse.png)](https://travis-ci.org/axshaw/projectGreenhouse)

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

Testing
========

Theres a range of testing stuff going on, there is some method in there somewhere.

npm test


Dev enviroment
==============

I have tried to keep a vagrant enviroment inline with the software required to run the complete system. The VM is configured to run all the services required including a virutal remote sensor that will send test data for integration tests. The VM is designed to be your development and build enviroment that will  run the complete setr of tests along with all required services. Right now I am in a continuous cycle of build, learn, refactor and the architecture is refining



[![Build Status](https://travis-ci.org/axshaw/projectGreenhouse.png)](https://travis-ci.org/axshaw/projectGreenhouse)
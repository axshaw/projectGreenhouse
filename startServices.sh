#!/bin/bash

echo "starting sensor collection server"
serialport-server /dev/ttyACM0 &

echo "starting node data collection server"
node node/relayServer.js &


